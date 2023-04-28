import { Col, Form, Input, Modal, notification, Row } from 'antd'
import { client } from 'libs/apis'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { EmployeeFormMeta } from 'types/form/misc'
import { RequestUpdateBaseSalaryInput } from 'types/schema'
import { getErrorMessage } from 'utils/string'

type FormValues = Partial<RequestUpdateBaseSalaryInput>

interface Props {
  employeeID: string
  isOpen: boolean
  initialValues?: FormValues
  meta?: EmployeeFormMeta
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditBaseSalaryModal = (props: Props) => {
  const { employeeID, isOpen, initialValues, meta, onClose, onAfterSubmit } =
    props

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateEmployeeBaseSalary(employeeID, {
        ...initialValues,
        personalAccountAmount: Number(values.personalAccountAmount),
        companyAccountAmount: Number(values.companyAccountAmount),
      } as RequestUpdateBaseSalaryInput)

      notification.success({
        message: "Employee's salary successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, "Could not update employee's salary"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Edit Base Salary"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Personal Account Amount"
              name="personalAccountAmount"
              rules={[{ required: true, message: 'Required' }]}
              normalize={(value) =>
                value ? Number(value.replace(/[^\d.]/g, '')) : undefined
              }
            >
              <NumericFormat
                className="bordered"
                placeholder="Enter personal account amount"
                thousandSeparator=","
                allowNegative={false}
                decimalScale={3}
                suffix={meta?.currency}
                customInput={Input}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Company Account Amount"
              name="companyAccountAmount"
              rules={[{ required: true, message: 'Required' }]}
              normalize={(value) =>
                value ? Number(value.replace(/[^\d.]/g, '')) : undefined
              }
            >
              <NumericFormat
                className="bordered"
                placeholder="Enter company account amount"
                thousandSeparator=","
                allowNegative={false}
                decimalScale={3}
                suffix={meta?.currency}
                customInput={Input}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
