import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Empty, Form, notification, Row, Space, Switch, Tag } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { FeedbackFormField } from 'components/common/Feedbacks/FeedbackFormField'
import { FormWrapper } from 'components/common/FormWrapper'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { ItemIndex } from 'components/common/ItemIndex'
import { PageHeader } from 'components/common/PageHeader'
import { PageSpinner } from 'components/common/PageSpinner'
import { SEO } from 'components/common/SEO'
import { statusColors } from 'constants/colors'
import { DomainTypes, FeedbackQuestionType } from 'constants/feedbackTypes'
import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { feedbackStatuses, ModelEventReviewerStatus } from 'constants/status'
import { useAuthContext } from 'context/auth'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { RequestSubmitBody } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { SurveyReviewModal } from './SurveyReviewModal'

export const SurveyForm = () => {
  const {
    query: { id: topicID, eventID },
    push,
  } = useRouter()
  const { permissions } = useAuthContext()

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
  const [showNote, setShowNote] = useState(true)

  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()

  const initialValues = useMemo(() => {
    return (detail?.answers || []).reduce((result, current) => {
      return {
        ...result,
        [current.eventQuestionID || '']: current.answer,
        [`${current.eventQuestionID}_notes`]: current.note || '',
      }
    }, {})
  }, [detail])

  useEffect(() => {
    setSubmittedValues({ ...initialValues })
  }, [initialValues])

  const answersToSubmit = useMemo(() => {
    return (detail?.answers || []).map((answer) => {
      return {
        ...answer,
        answer: submittedValues[answer.eventQuestionID || ''],
        note: submittedValues[`${answer.eventQuestionID}_notes`],
      }
    })
  }, [submittedValues, detail])

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
        message: getErrorMessage(error, 'Could not save the feedback as draft'),
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
    <>
      <SEO title={detail.title || '-'} />

      <Breadcrumb
        items={[
          {
            label: 'Feedbacks',
          },
          {
            label: 'Inbox',
            href: ROUTES.INBOX,
          },
          {
            label: detail?.title || '-',
          },
        ]}
      />

      <Space style={{ width: '100%' }} size={24} direction="vertical">
        <PageHeader
          title={
            <Space>
              <span>{detail.title}</span>
              {detail.status ===
                ModelEventReviewerStatus.EventReviewerStatusDraft && (
                <Tag color={statusColors[detail.status]}>
                  {feedbackStatuses[detail.status]}
                </Tag>
              )}
            </Space>
          }
          backHref={ROUTES.INBOX}
        />
        <Row>
          <Col span={24} lg={{ span: 16 }}>
            <FormWrapper
              footer={
                detail.status !==
                ModelEventReviewerStatus.EventReviewerStatusDone ? (
                  <AuthenticatedContent
                    permission={Permission.FEEDBACKS_CREATE}
                  >
                    <Row gutter={8} justify="space-between" align="middle">
                      <Col>
                        <Space>
                          <Switch
                            checked={showNote}
                            onChange={(checked) => setShowNote(checked)}
                          />
                          <span>Show note</span>
                        </Space>
                      </Col>
                      <Col>
                        <Row gutter={8}>
                          <Col>
                            <Button
                              type="default"
                              onClick={onSaveDraft}
                              loading={isSubmitting}
                            >
                              Save Draft
                            </Button>
                          </Col>
                          <Col>
                            <Button type="primary" onClick={form.submit}>
                              Preview & Send
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </AuthenticatedContent>
                ) : undefined
              }
            >
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
                  {detail.answers && detail.answers.length ? (
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
                            done={
                              detail.status ===
                                ModelEventReviewerStatus.EventReviewerStatusDone ||
                              !permissions.includes(Permission.FEEDBACKS_CREATE)
                            }
                            domain={field.domain as DomainTypes}
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
            </FormWrapper>
          </Col>
        </Row>
      </Space>

      {isPreviewDialogOpen && (
        <SurveyReviewModal
          answers={answersToSubmit}
          detail={detail}
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          onOk={() =>
            submitForm({
              status: ModelEventReviewerStatus.EventReviewerStatusDone,
            })
          }
        />
      )}
    </>
  )
}
