import { Form, Modal, notification, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestCreateSurveyFeedbackInput } from 'types/schema'
import { getErrorMessage } from 'utils/string'

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

  const onSubmit = async (values: RequestCreateSurveyFeedbackInput) => {
    try {
      setIsSubmitting(true)

      await client.createSurvey({
        ...values,
        type: FeedbackSubtype.ENGAGEMENT,
      })

      notification.success({
        message: 'Employee engagement survey event created successfully!',
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not create event'),
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
      title="New Event"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item
          label="Quarter"
          name="quarter"
          rules={[{ required: true, message: 'Required' }]}
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
          rules={[{ required: true, message: 'Required' }]}
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
