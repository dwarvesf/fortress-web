import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Col, Empty, Form, notification, Row, Space, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { Button } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { ModelEventReviewerStatus } from 'constants/status'
import { RequestSubmitBody } from 'types/schema'
import { PageSpinner } from 'components/common/PageSpinner'
import { FeedbackFormField } from 'components/common/Feedbacks/FeedbackFormField'
import { FeedbackQuestionType } from 'constants/feedbackTypes'
import { EngagementSurveyPreviewModal } from './EngagementSurveyPreviewModal'
import { ItemIndex } from '../../../../common/ItemIndex'

export const EngagementSurveyForm = () => {
  const {
    query: { id: topicID, eventID },
    push,
  } = useRouter()

  const { data, loading, mutate } = useFetchWithCache(
    [GET_PATHS.getFeedbacks, topicID, eventID],
    () => client.getPersonalFeedback(eventID as string, topicID as string),
    {
      revalidateOnFocus: false,
    },
  )
  const detail = data?.data

  const [form] = useForm()
  const [submittedValues, setSubmittedValues] = useState<Record<string, any>>(
    {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNote, setShowNite] = useState(true)

  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()

  const initialValues = useMemo(
    () =>
      (detail?.answers || []).reduce((result, current) => {
        return {
          ...result,
          [current.eventQuestionID!]: current.answer,
          [`${current.eventQuestionID}_notes`]: current.note || '',
        }
      }, {}),
    [detail],
  )

  useEffect(() => {
    setSubmittedValues({ ...initialValues })
  }, [initialValues])

  const answersToSubmit = useMemo(
    () =>
      (detail?.answers || []).map((answer) => {
        return {
          ...answer,
          answer: submittedValues[answer.eventQuestionID || ''],
          note: submittedValues[`${answer.eventQuestionID}_notes`],
        }
      }),
    [submittedValues, detail],
  )

  const submitForm = async ({
    status,
  }: {
    status: ModelEventReviewerStatus
  }) => {
    try {
      setIsSubmitting(true)

      await client.submitPersonalFeedback(
        eventID as string,
        topicID as string,
        {
          answers: answersToSubmit as RequestSubmitBody['answers'],
          status,
        },
      )

      notification.success({
        message: `Feedback ${
          status === ModelEventReviewerStatus.EventReviewerStatusDraft
            ? 'saved'
            : 'submitted'
        } successfully!`,
      })

      mutate()
      push(ROUTES.INBOX)
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not save the feedback as draft!',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (values: any) => {
    setSubmittedValues({ ...values })
    openPreviewDialog()
  }

  const onSaveDraft = () => {
    submitForm({ status: ModelEventReviewerStatus.EventReviewerStatusDraft })
  }

  if (!detail || loading) {
    return <PageSpinner />
  }

  return (
    <Space style={{ width: '100%' }} size={24} direction="vertical">
      <PageHeader title="Engagement Survey Q1/2022" backHref={ROUTES.INBOX} />
      <Row>
        <Col lg={{ span: 16 }}>
          <Card>
            <Form
              form={form}
              onFinish={onSubmit}
              onValuesChange={(_, values) => {
                setSubmittedValues({ ...values })
              }}
              initialValues={initialValues}
              validateTrigger="onSubmit"
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {detail.answers?.length ? (
                  detail.answers.map((field, index) => (
                    <Row key={index} gutter={24} wrap={false}>
                      <Col
                        style={{
                          height: 40,
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <ItemIndex
                          active={
                            submittedValues?.[field.eventQuestionID || '']
                          }
                        >
                          {index + 1}
                        </ItemIndex>
                      </Col>
                      <Col flex={1}>
                        <FeedbackFormField
                          type={
                            (field.type as FeedbackQuestionType) ||
                            FeedbackQuestionType.GENERAL
                          }
                          name={field.eventQuestionID}
                          label={field.content}
                          showNote={showNote}
                          disabled={
                            detail.status ===
                            ModelEventReviewerStatus.EventReviewerStatusDone
                          }
                          required
                        />
                      </Col>
                    </Row>
                  ))
                ) : (
                  <Empty description="No questions data" />
                )}
              </Space>
            </Form>
            <Space>
              <Switch
                checked={showNote}
                onChange={(checked) => setShowNite(checked)}
              />
              <span>Show note</span>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col>
          <Button type="default" onClick={onSaveDraft} loading={isSubmitting}>
            Save Draft
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={form.submit}>
            Preview & Send
          </Button>
        </Col>
      </Row>

      {isPreviewDialogOpen && (
        <EngagementSurveyPreviewModal
          answers={answersToSubmit}
          detail={detail}
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          onOk={() => {
            submitForm({
              status: ModelEventReviewerStatus.EventReviewerStatusDone,
            })
          }}
        />
      )}
    </Space>
  )
}
