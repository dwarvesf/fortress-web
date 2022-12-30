import { DatePicker, Form, Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SELECT_BOX_DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestCreateSurveyFeedbackInput } from 'types/schema'
import { format } from 'date-fns'
import { getErrorMessage } from 'utils/string'
import moment from 'moment'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAfterSubmit: () => void
}

export const CreateWorkSurveyModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit } = props
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
    }
  }

  // Default initial values = next monday -> friday 2 weeks after
  let fromDate: moment.Moment
  let toDate: moment.Moment
  const today = moment().isoWeekday()
  // If today is not Monday, set for monday next week
  if (today !== 1) {
    fromDate = moment().add(1, 'week').isoWeekday(1)
    toDate = moment().add(2, 'week').isoWeekday(5)
  } else {
    // Else set for this week
    fromDate = moment().isoWeekday(1)
    toDate = moment().add(1, 'week').isoWeekday(5)
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
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          fromDate,
          toDate,
        }}
      >
        <Form.Item
          label="From date"
          name="fromDate"
          required
          rules={[{ required: true, message: 'Required' }]}
        >
          <DatePicker
            format={SELECT_BOX_DATE_FORMAT}
            style={{ width: '100%' }}
            placeholder="Select start date"
            className="bordered"
            onChange={(value) => {
              form.setFieldValue('fromDate', value)
              // Also set the end date to the Friday of next week
              form.setFieldValue(
                'toDate',
                moment(value).add(1, 'week').isoWeekday(5),
              )
            }}
            disabledDate={(date) => {
              // Disable date if it's before today
              if (date.isBefore(new Date())) {
                return true
              }

              // Disable date if it's not Monday
              if (date.isoWeekday() !== 1) {
                return true
              }

              return false
            }}
          />
        </Form.Item>
        <Form.Item
          label="To date"
          name="toDate"
          required
          rules={[{ required: true, message: 'Required' }]}
        >
          <DatePicker
            format={SELECT_BOX_DATE_FORMAT}
            style={{ width: '100%' }}
            placeholder="Select end date"
            className="bordered"
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
