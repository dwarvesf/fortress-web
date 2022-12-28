import { DatePicker, Form, Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SELECT_BOX_DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestCreateSurveyFeedbackInput } from 'types/schema'
import { format } from 'date-fns'
import { getErrorMessage } from 'utils/string'

interface Props {
  isOpen: boolean
  initialValues: Partial<
    Omit<RequestCreateSurveyFeedbackInput, 'fromDate' | 'toDate'> & {
      fromDate: moment.Moment
      toDate: moment.Moment
    }
  >
  onClose: () => void
  onAfterSubmit: () => void
  projectsToSend: string[]
}

export const CreateWorkSurveyModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit, projectsToSend } =
    props
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: RequestCreateSurveyFeedbackInput) => {
    try {
      setIsSubmitting(true)

      await client.createSurvey(transformDataToSend(values))

      notification.success({
        message: 'Work survey created successfully!',
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not create work survey'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (
    values: Record<string, any>,
  ): RequestCreateSurveyFeedbackInput => {
    return {
      ...values,
      fromDate: values.fromDate
        ? String(format(new Date(values.fromDate), SERVER_DATE_FORMAT))
        : '',
      toDate: values.toDate
        ? String(format(new Date(values.toDate), SERVER_DATE_FORMAT))
        : '',
      type: FeedbackSubtype.WORK,
      projectIDs: projectsToSend,
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
          label="From date"
          name="fromDate"
          required
          rules={[{ required: true, message: 'Please select start date' }]}
        >
          <DatePicker
            format={SELECT_BOX_DATE_FORMAT}
            style={{ width: '100%' }}
            placeholder="Select start date"
            className="bordered"
          />
        </Form.Item>
        <Form.Item
          label="To date"
          name="toDate"
          required
          rules={[{ required: true }]}
        >
          <DatePicker
            format={SELECT_BOX_DATE_FORMAT}
            style={{ width: '100%' }}
            placeholder="Select end date"
            className="bordered"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
