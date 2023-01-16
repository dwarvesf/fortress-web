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

  // Default initial values = monday 2 weeks ago -> next friday
  let fromDate: moment.Moment
  let toDate: moment.Moment
  const today = moment().isoWeekday()
  // If today is not Friday
  if (today !== 5) {
    fromDate = moment().isoWeekday(1)
    toDate = moment().add(1, 'week').isoWeekday(5)
  } else {
    fromDate = moment().subtract(1, 'week').isoWeekday(1)
    toDate = moment().isoWeekday(5)
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
      title="New Event"
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
          name="toDate"
          rules={[{ required: true, message: 'Required' }]}
          label="End of 2 weeks"
        >
          <DatePicker
            format={SELECT_BOX_DATE_FORMAT}
            style={{ width: '100%' }}
            placeholder="Select date"
            className="bordered"
            onChange={(value) => {
              form.setFieldValue('toDate', value)
              // Also set the fromDate to the Monday 2 weeks ago
              form.setFieldValue(
                'fromDate',
                moment(value).subtract(1, 'week').isoWeekday(1),
              )
            }}
            disabledDate={(date) => {
              // Disable date if it's not Friday
              if (date.isoWeekday() !== 5) {
                return true
              }

              return false
            }}
          />
        </Form.Item>
        <Form.Item
          name="fromDate"
          rules={[{ required: true, message: 'Required' }]}
          style={{ display: 'none' }}
        >
          <DatePicker format={SELECT_BOX_DATE_FORMAT} disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}
