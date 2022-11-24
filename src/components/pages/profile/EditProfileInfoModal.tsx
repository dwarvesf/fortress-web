import { Col, Form, Input, Modal, notification, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client } from 'libs/apis'
import { useState } from 'react'
import { ViewEmployeeData } from 'types/schema'

type ProfileInfoFormValues = Pick<
  ViewEmployeeData,
  | 'phoneNumber'
  | 'discordID'
  | 'githubID'
  | 'personalEmail'
  | 'teamEmail'
  | 'notionID'
>

interface Props {
  isOpen: boolean
  initialValues: ProfileInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProfileInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProfileInfoFormValues) => {
    try {
      setIsSubmitting(true)
      await client.updateProfile(values)

      notification.success({ message: 'Profile info updated successfully!' })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not update profile info',
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
      title="Edit Profile"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter phone number" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team Email"
              name="teamEmail"
              required
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder="Enter team email" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              required
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder="Enter personal email" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Discord ID" name="discordID">
              <Input placeholder="Enter Discord ID" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Github ID" name="githubID">
              <Input placeholder="Enter Github ID" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Notion ID" name="notionID">
              <Input placeholder="Enter Notion ID" className="bordered" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
