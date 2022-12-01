import { Form, Modal, notification, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  initialValues: { quarters: string; year: number }
  onClose: () => void
  onAfterSubmit: () => void
}

export const CreatePeerReviewModal = (props: Props) => {
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
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okText="Create"
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="New event"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item
          label="Quarters"
          name="quarters"
          required
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select quarters"
            options={[1, 2, 3, 4].map((q) => ({
              label: `Q${q},Q${(q % 4) + 1}`,
              value: q,
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
