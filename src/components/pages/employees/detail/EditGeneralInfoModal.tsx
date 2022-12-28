import { Col, Form, Input, Modal, notification, Row } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { EmployeeStatus } from 'constants/status'
import { GET_PATHS, client } from 'libs/apis'
import { useState } from 'react'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestUpdateEmployeeGeneralInfoInput } from 'types/schema'
import { transformEmployeeDataToSelectOption } from 'utils/select'
import PhoneInput from 'react-phone-input-2'
import { getErrorMessage } from 'utils/string'

interface Props {
  employeeID: string
  isOpen: boolean
  initialValues?: RequestUpdateEmployeeGeneralInfoInput
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditGeneralInfoModal = (props: Props) => {
  const { employeeID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const onSubmit = async (
    values: Required<RequestUpdateEmployeeGeneralInfoInput>,
  ) => {
    try {
      setIsSubmitting(true)
      await client.updateEmployeeGeneralInfo(employeeID, values)

      notification.success({
        message: "Employee's general info successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update employee's general info",
        ),
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
      title="Edit General Info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                { required: true, message: 'Please input full name' },
                {
                  max: 99,
                  message: 'Full name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team email"
              name="email"
              rules={[
                { required: true, message: 'Please input team email' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter team email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Phone number"
              rules={[
                {
                  required: true,
                  message: 'Please input phone number',
                },
              ]}
            >
              <PhoneInput
                country="vn"
                onChange={(phone, data) => {
                  if ('dialCode' in data) {
                    setPhoneNumber(`+${data.dialCode} ${phone}`)
                  }
                }}
                inputStyle={{ width: '100%' }}
                countryCodeEditable={false}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Line manager" name="lineManagerID">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getEmployees({
                    ...fullListPagination,
                    workingStatuses: [EmployeeStatus.FULLTIME],
                  })
                  return (data || []).map(transformEmployeeDataToSelectOption)
                }}
                swrKeys={[GET_PATHS.getEmployees, 'line-manager']}
                placeholder="Select line manager"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
