import { Form, Modal, notification, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  initialValues: Partial<any> // TODO: add type
  onClose: () => void
  onAfterSubmit: () => void
}

export const CreateEngagementSurveyModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      notification.success({
        message: 'Peer performance review event created successfully!',
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not create peer performance review',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      okText="Create"
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="New event"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item
          label="Quarter"
          name="quarter"
          required
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select quarter"
            options={['q1', 'q2', 'q3', 'q4'].map((value) => ({
              label: value.toUpperCase(),
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Year"
          name="year"
          required
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select year"
            options={[...Array(10).keys()].map((i) => ({
              label: currentYear + i,
              value: currentYear + i,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
