import { Col, DatePicker, Form, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from 'components/common/Button'
import { FormWrapper } from 'components/common/FormWrapper'
import { AsyncSelect } from 'components/common/Select'
import { renderProjectOption } from 'components/common/Select/renderers/projectOption'
import { MONTH_YEAR_FORMAT, SELECT_BOX_DATE_FORMAT } from 'constants/date'
import { client, GET_PATHS } from 'libs/apis'
import { fullListPagination } from 'types/filters/Pagination'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { transformProjectDataToSelectOption } from 'utils/select'

export const InvoiceForm = () => {
  return (
    <FormWrapper
      footer={
        <Button
          type="primary"
          htmlType="submit"
          //   loading={isSubmitting}
          //   onClick={form.submit}
        >
          Submit
        </Button>
      }
    >
      <Form
      // form={form}
      // initialValues={initialValues}
      // onFinish={(values) => {
      //   if (!isEditing) {
      //     onCreateSubmit(values as Required<RequestCreateEmployeeInput>)
      //   }
      // }}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Project"
              name="project"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getProjects({
                    ...new ProjectListFilter(),
                    ...fullListPagination,
                  })

                  return (data || []).map(transformProjectDataToSelectOption)
                }}
                swrKeys={GET_PATHS.getProjects}
                placeholder="Select project"
                customOptionRenderer={renderProjectOption}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Invoice number"
              name="invoiceNumber"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter invoice number"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Invoice month"
              name="invoiceMonth"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker
                format={MONTH_YEAR_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select invoice month"
                className="bordered"
                picker="month"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter company name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Invoice date"
              name="invoiceDate"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select invoice date"
                className="bordered"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Due date"
              name="dueDate"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select due date"
                className="bordered"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter address"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 16 }}>
            <Form.Item label="Description" name="description">
              <TextArea
                className="bordered"
                rows={4}
                bordered
                placeholder="Tell us more about this"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 8 }}>
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

          <Col span={24} md={{ span: 16 }}>
            <Form.Item label="Note" name="note">
              <TextArea className="bordered" rows={1} bordered />
            </Form.Item>
          </Col>

          {/* <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="CC"
              name="cc"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AntdInputTag ref={ccRef} />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </FormWrapper>
  )
}
