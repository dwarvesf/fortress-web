import { Col, Form, Input, notification, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from 'components/common/Button'
import { FormWrapper } from 'components/common/FormWrapper'
import { renderProjectOption } from 'components/common/Select/renderers/projectOption'
import { MONTH_YEAR_FORMAT, SELECT_BOX_DATE_FORMAT } from 'constants/date'
import { client, GET_PATHS } from 'libs/apis'
import { fullListPagination } from 'types/filters/Pagination'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { transformProjectDataToSelectOption } from 'utils/select'
import { useState } from 'react'
import { InvoiceFormInputList } from 'components/pages/invoice/new/InvoiceFormInputList'
import { useForm } from 'antd/lib/form/Form'
import moment, { Moment } from 'moment'
import { ModelInvoiceItem, ViewProjectInvoiceTemplate } from 'types/schema'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { SummarySection } from './SummarySection'

const getDescription = (projectName: string, date: Moment) => {
  try {
    return `Invoice for ${
      projectName || '<>'
    } project development in ${date.format(
      'MMMM YYYY',
    )}.\nThe development covers from ${date.format('MMMM')} 1st, ${date.format(
      'YYYY',
    )} to ${date.format('MMMM')} ${date
      .endOf('month')
      .format('Do')}, ${date.format('YYYY')}.`
  } catch (err) {
    return ''
  }
}

interface FormValues {
  projectID?: string
  company?: string
  address?: string
  email?: string
  cc?: string[]
  invoiceNumber?: string
  invoiceMonth?: Moment
  invoiceDate?: Moment
  dueDate?: Moment
  description?: string
  note?: string
  lineItems?: ModelInvoiceItem[]
}

export const InvoiceForm = () => {
  const [form] = useForm<FormValues>()
  const [invoice, setInvoice] = useState<ViewProjectInvoiceTemplate | null>(
    null,
  )
  const [summary, setSummary] = useState({ total: 0, subtotal: 0, discount: 0 })
  const [loading, setLoading] = useState(false)
  const { data: projectData } = useFetchWithCache(GET_PATHS.getProjects, () =>
    client.getProjects({
      ...new ProjectListFilter(),
      ...fullListPagination,
    }),
  )

  const onProjectIDChange = async (projectID: string) => {
    try {
      if (!projectID) {
        setInvoice(null)
        setSummary({ total: 0, subtotal: 0, discount: 0 })
        form.resetFields()
        return
      }
      setLoading(true)
      const invoiceData = await client.getInvoiceTemplate(projectID)
      const invoice = invoiceData.data
      if (!invoice) {
        throw new Error('Invoice not found')
      }
      setInvoice(invoice)
      const invoiceMonth = moment()
      form.setFieldsValue({
        company: invoice.client?.clientCompany,
        address: invoice.client?.clientAddress,
        email:
          invoice.lastInvoice?.email ||
          invoice.client?.contacts?.[0]?.emails?.[0] ||
          '',
        cc: invoice.lastInvoice?.cc?.filter(Boolean) || [],
        invoiceNumber: invoice.invoiceNumber,
        invoiceMonth,
        invoiceDate: invoiceMonth,
        dueDate: invoiceMonth.clone().add(7, 'days'),
        description: invoice.name
          ? getDescription(invoice.name, invoiceMonth)
          : '',
        lineItems: invoice.lastInvoice?.lineItems,
      })
      setSummary({
        total: invoice.lastInvoice?.total || 0,
        subtotal: invoice.lastInvoice?.subTotal || 0,
        discount: invoice.lastInvoice?.discount || 0,
      })
    } catch (error: any) {
      setInvoice(null)
      setSummary({ total: 0, subtotal: 0, discount: 0 })
      const { projectID, ...rest } = form.getFieldsValue()
      form.resetFields(Object.keys(rest))
      notification.error({
        message: 'Could not fetch invoice template',
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      if (!invoice?.bankAccount?.id || !values.projectID) {
        return
      }
      setLoading(true)
      await client.createInvoice({
        bankID: invoice?.bankAccount?.id,
        cc: values.cc,
        description: values.description,
        email: values.email!,
        dueDate: values.dueDate?.format('YYYY-MM-DD') || '',
        invoiceDate: values.invoiceDate?.format('YYYY-MM-DD') || '',
        invoiceMonth: values.invoiceMonth
          ? values.invoiceMonth.month() + 1
          : undefined,
        invoiceYear: values.invoiceMonth
          ? values.invoiceMonth.year()
          : undefined,
        isDraft: false,
        lineItems: values.lineItems?.map((each) => ({
          ...each,
          discount: each.discount || 0,
          isExternal: false,
        })),
        note: values.note,
        projectID: values.projectID,
        total: summary.total,
        subtotal: summary.subtotal,
        discount: summary.discount,
        // number: values.invoiceNumber,
        // sentByID: 'string',
        // tax: 0,
      })
      notification.success({
        message: 'Invoice created successfully',
      })
    } catch (error: any) {
      notification.error({
        message: 'Could not create invoice template',
      })
    } finally {
      setLoading(false)
    }
  }

  const onLineItemsChange = (values: ModelInvoiceItem[]) => {
    const newValues = values.map((each) => ({
      ...each,
      cost:
        each?.quantity && each?.unitCost
          ? each.quantity * each.unitCost * (1 - (each?.discount || 0) / 100)
          : undefined,
    }))
    form.setFieldValue('lineItems', newValues)
    const { total, subtotal } = newValues.reduce(
      (prev, curr) => ({
        total: prev.total + (curr.cost || 0),
        subtotal: prev.subtotal + (curr.cost || 0),
      }),
      { total: 0, subtotal: 0 },
    )
    setSummary({ total, subtotal, discount: 0 })
  }

  return (
    <Row>
      <Col span={24} lg={{ span: 16 }}>
        <FormWrapper
          footer={
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
              onClick={form.submit}
            >
              Submit
            </Button>
          }
        >
          <Form
            form={form}
            onFinish={onSubmit}
            onFieldsChange={(changedFields) => {
              if (
                changedFields.length === 1 &&
                Array.isArray(changedFields[0].name) &&
                changedFields[0].name[0] === 'lineItems' &&
                !!changedFields[0].name[2]
              ) {
                onLineItemsChange(form.getFieldValue('lineItems'))
              }
            }}
          >
            <Row gutter={24} style={{ marginBottom: 36 }}>
              <Col span={24} lg={{ span: 8 }}>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Project"
                      name="projectID"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Select
                        placeholder="Select project"
                        onChange={onProjectIDChange}
                        allowClear
                      >
                        {projectData?.data
                          ?.map(transformProjectDataToSelectOption)
                          .map(renderProjectOption)}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Company"
                      name="company"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Enter company name"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Enter address"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Required' },
                        { type: 'email', message: 'Wrong email format' },
                      ]}
                    >
                      <Input
                        className="bordered"
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="CC"
                      name="cc"
                      rules={[
                        {
                          type: 'array',
                          defaultField: {
                            type: 'email',
                            message: 'Wrong email format',
                          },
                        },
                      ]}
                    >
                      <Select
                        mode="tags"
                        placeholder="Select CC"
                        options={invoice?.lastInvoice?.cc
                          ?.filter(Boolean)
                          .map((value) => ({ value, label: value }))}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={24} lg={{ span: 16 }}>
                <Row gutter={24}>
                  <Col span={24} lg={{ span: 12 }}>
                    <Form.Item
                      label="Invoice Number"
                      name="invoiceNumber"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Enter invoice number"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={{ span: 12 }}>
                    <Form.Item
                      label="Invoice Month"
                      name="invoiceMonth"
                      rules={[{ required: true, message: 'Required' }]}
                      getValueProps={(value) => ({
                        value: value ? value.format(MONTH_YEAR_FORMAT) : '',
                      })}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Select invoice month"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={{ span: 12 }}>
                    <Form.Item
                      label="Invoice Date"
                      name="invoiceDate"
                      rules={[{ required: true, message: 'Required' }]}
                      getValueProps={(value) => ({
                        value: value
                          ? value.format(SELECT_BOX_DATE_FORMAT)
                          : '',
                      })}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Select invoice date"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={{ span: 12 }}>
                    <Form.Item
                      label="Due Date"
                      name="dueDate"
                      rules={[{ required: true, message: 'Required' }]}
                      getValueProps={(value) => ({
                        value: value
                          ? value.format(SELECT_BOX_DATE_FORMAT)
                          : '',
                      })}
                    >
                      <Input
                        className="bordered disabled"
                        type="text"
                        placeholder="Select due date"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Description" name="description">
                      <TextArea
                        className="bordered"
                        rows={4}
                        bordered
                        placeholder="Tell us more about this"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Note" name="note">
                      <TextArea className="bordered" rows={3} bordered />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <InvoiceFormInputList
              name="lineItems"
              currency={invoice?.bankAccount?.currency}
              summary={summary}
            />

            <SummarySection invoice={invoice} style={{ marginTop: 40 }} />
          </Form>
        </FormWrapper>
      </Col>
    </Row>
  )
}
