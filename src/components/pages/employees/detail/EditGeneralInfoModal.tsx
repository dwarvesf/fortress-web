import { Col, Form, Input, Modal, notification, Row } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { GET_PATHS, client } from 'libs/apis'
import { useState } from 'react'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestUpdateEmployeeGeneralInfoInput } from 'types/schema'
import { transformEmployeeDataToSelectOption } from 'utils/select'
import PhoneInput from 'react-phone-input-2'
import {
  formatPhoneNumber,
  getErrorMessage,
  removeLeadingZero,
} from 'utils/string'

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
  const hasPrefix = initialValues?.phone.includes('+') || false

  const [dialCode, setDialCode] = useState<string>(
    hasPrefix ? initialValues?.phone.split(' ')[0].slice(1) || '' : '84',
  )

  const onSubmit = async (
    values: Required<RequestUpdateEmployeeGeneralInfoInput>,
  ) => {
    try {
      setIsSubmitting(true)

      await client.updateEmployeeGeneralInfo(employeeID, {
        ...values,
        phone: values.phone.includes(' ') // need to check this for the case submit without editing
          ? // in case phone is not edited, the value has the form +84 12345...
            values.phone
          : // otherwise its value is passed from PhoneInput's
            // onChange and has the form of 8412345...
            `+${dialCode} ${removeLeadingZero(
              values.phone.slice(dialCode.length),
            )}`,
      })

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
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          ...initialValues,
          // pass phone manually since antd Form pass value through
          // 'name' attr and overwrite PhoneInput's value
          phone: formatPhoneNumber(dialCode, initialValues?.phone),
        }}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: 'Required' },
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
              label="Display Name"
              name="displayName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Display name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter display name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team email"
              name="email"
              rules={[
                { required: true, message: 'Required' },
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
              name="phone"
              rules={[{ required: true, message: 'Required' }]}
            >
              <PhoneInput
                country="vn"
                onChange={(value, data) => {
                  // store dial code and phone number individually
                  form.setFieldValue('phone', value)
                  if ('dialCode' in data) {
                    setDialCode(data.dialCode)
                  }
                }}
                inputStyle={{ width: '100%', height: 40 }}
                enableSearch
                disableSearchIcon
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Line manager" name="lineManagerID">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getEmployees({
                    ...fullListPagination,
                  })
                  return (data || []).map(transformEmployeeDataToSelectOption)
                }}
                swrKeys={GET_PATHS.getEmployees}
                placeholder="Select line manager"
                customOptionRenderer={renderEmployeeOption}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Discord" name="discordName">
              <Input placeholder="Enter Discord Name" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Github" name="githubID">
              <Input placeholder="Enter Github ID" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Notion" name="notionName">
              <Input placeholder="Enter Notion Name" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="LinkedIn" name="linkedInName">
              <Input placeholder="Enter LinkedIn Name" className="bordered" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
