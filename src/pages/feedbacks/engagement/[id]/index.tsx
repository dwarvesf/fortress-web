import {
  Button,
  Col,
  Input,
  Modal,
  notification,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { EngagementDetailActions } from 'components/pages/feedbacks/engagement/EngagementDetailActions'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  SurveyEventStatus,
  surveyEventStatuses,
  SurveyParticipantStatus,
  surveyParticipantStatuses,
} from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SurveyDetailFilter } from 'types/filters/SurveyDetailFilter'
import { ViewTopic } from 'types/schema'
import debounce from 'lodash.debounce'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { getErrorMessage } from 'utils/string'
import { FeedbackSubtype } from 'constants/feedbackTypes'

const columns: ColumnsType<ViewTopic> = [
  {
    title: 'Employee',
    key: 'employee',
    dataIndex: 'employee',
    render: (value) => <UserAvatar user={value} />,
    fixed: 'left',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: SurveyParticipantStatus) => (
      <Tag color={statusColors[value]}>
        {surveyParticipantStatuses[value] || '-'}
      </Tag>
    ),
  },
  {
    title: '',
    render: (value) => <EngagementDetailActions engagementDetail={value} />,
    fixed: 'right',
  },
]

const Default = () => {
  const {
    query: { id },
  } = useRouter()
  const engagementId = id as string
  const { filter, setFilter } = useFilter(new SurveyDetailFilter())
  const {
    data,
    loading,
    mutate: mutateSurveyDetail,
  } = useFetchWithCache(
    [GET_PATHS.getSurveyDetail(engagementId), engagementId, filter],
    () => client.getSurveyDetail(engagementId, filter),
  )
  const { title, status, topics: engagements = [] } = data?.data || {}
  const [isLoading, setIsLoading] = useState(false)

  const onSendServey = async () => {
    try {
      setIsLoading(true)

      await client.sendSurvey(engagementId, {
        topicIDs: [],
        type: FeedbackSubtype.ENGAGEMENT,
      })

      notification.success({
        message: 'Engagement servey sent successfully!',
      })

      mutateSurveyDetail()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not send engagement servey'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmSendServey = () => {
    Modal.confirm({
      title: 'Send servey',
      content: `Do you want to send this survey out?`,
      okText: 'Send',
      okButtonProps: { loading: isLoading },
      onOk: onSendServey,
    })
  }

  const completeSurvey = async () => {
    try {
      setIsLoading(true)

      await client.markSurveyAsDone(engagementId)

      notification.success({
        message: 'Engagement survey closed successfully!',
      })

      mutateSurveyDetail()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not close engagement survey'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmCompleteSurvey = () => {
    const done = engagements.filter(
      (each) => each.status === SurveyParticipantStatus.DONE,
    ).length
    Modal.confirm({
      title: 'Complete survey',
      content: `There are ${done} people have filled the survey, do you want to close it?`,
      okText: 'Close',
      okButtonProps: { loading: isLoading },
      onOk: completeSurvey,
    })
  }

  return (
    <>
      <SEO title={`Engagement - ${title || '-'}`} />

      <Breadcrumb
        items={[
          {
            label: 'Feedbacks',
          },
          {
            label: 'Engagement',
            href: ROUTES.ENGAGEMENT,
          },
          {
            label: title || '-',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          backHref={ROUTES.ENGAGEMENT}
          title={
            <Space align="center">
              <span>{title}</span>
              {status && (
                <div style={{ display: 'flex' }}>
                  <Tag color={statusColors[status]}>
                    {surveyEventStatuses[status as SurveyEventStatus] || '-'}
                  </Tag>
                </div>
              )}
            </Space>
          }
          rightRender={
            <>
              <Col style={{ width: 256 }}>
                <Input
                  placeholder="Search by name..."
                  bordered
                  onChange={debounce((e) => {
                    setFilter({ keyword: e.target.value })
                  }, 500)}
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  disabled={
                    isLoading || !status || status === SurveyEventStatus.DONE
                  }
                  loading={isLoading}
                  onClick={
                    status === SurveyEventStatus.DRAFT
                      ? confirmSendServey
                      : confirmCompleteSurvey
                  }
                >
                  {status === SurveyEventStatus.DRAFT ? 'Send' : 'Close'}
                </Button>
              </Col>
            </>
          }
        />
        <Table
          dataSource={engagements}
          columns={columns}
          rowKey={(row) => row.id as string}
          loading={loading}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page) => setFilter({ page })}
            total={data?.total}
            pageSize={filter.size}
            hideOnSinglePage
          />
        </Row>
      </Space>
    </>
  )
}

export default Default
