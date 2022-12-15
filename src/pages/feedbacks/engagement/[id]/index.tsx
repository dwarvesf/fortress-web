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
import { AvatarWithName } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { EngagementDetailActions } from 'components/pages/feedbacks/engagement/EngagementDetailActions'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  SurveyStatus,
  surveyStatuses,
  SurveyTopicStatus,
  surveyTopicStatuses,
} from 'constants/status'
import React, { useState } from 'react'
import { ViewBasicEmployeeInfo } from 'types/schema'

interface EngagementDetail {
  id?: string
  employee?: ViewBasicEmployeeInfo
  status?: string
}

const data: EngagementDetail[] = [
  {
    id: '1',
    employee: {
      id: '1',
      displayName: 'John Doe',
    },
    status: 'sent',
  },
  {
    id: '1',
    employee: {
      id: '1',
      displayName: 'John Doe',
    },
    status: 'done',
  },
]

const columns: ColumnsType<EngagementDetail> = [
  {
    title: 'Employee',
    key: 'employee',
    dataIndex: 'employee',
    render: (value) => <AvatarWithName user={value} />,
    fixed: 'left',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value) => (
      <Tag color={statusColors[value]}>
        {surveyTopicStatuses[value as SurveyTopicStatus] || '-'}
      </Tag>
    ),
  },
  {
    title: '',
    render: () => <EngagementDetailActions />,
    fixed: 'right',
  },
]

const Default = () => {
  const title = 'Q1 2022'
  const status = 'draft'
  const peopleNumner = 72
  const [isLoading, setIsLoading] = useState(false)
  const [isSurveySent, setIsSurveySent] = useState(false)

  const onSendServey = async () => {
    try {
      setIsLoading(true)

      notification.success({
        message: 'Engagement servey sent successfully!',
      })

      setIsSurveySent(true)
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not send engagement servey',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmSendServey = () => {
    Modal.confirm({
      title: 'Send servey',
      content: `Do you want to send survey to ${peopleNumner} people?`,
      okText: 'Send',
      okButtonProps: { loading: isLoading },
      onOk: onSendServey,
    })
  }

  const completeSurvey = async () => {
    try {
      setIsLoading(true)

      notification.success({
        message: 'Engagement survey closed successfully!',
      })
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not close engagement survey',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmCompleteSurvey = () => {
    Modal.confirm({
      title: 'Complete survey',
      content: `There are ${peopleNumner} people have filled the survey, do you want to close it?`,
      okText: 'Close',
      okButtonProps: { loading: isLoading },
      onOk: completeSurvey,
    })
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        backHref={ROUTES.ENGAGEMENT}
        title={
          <Space align="center">
            <span>{title}</span>
            {status && (
              <div style={{ display: 'flex' }}>
                <Tag color={statusColors[status]}>
                  {surveyStatuses[status as SurveyStatus] || '-'}
                </Tag>
              </div>
            )}
          </Space>
        }
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input placeholder="Search by name..." bordered />
            </Col>
            <Col>
              <Button
                type="primary"
                disabled={isLoading}
                loading={isLoading}
                onClick={
                  isSurveySent ? confirmCompleteSurvey : confirmSendServey
                }
              >
                {isSurveySent ? 'Close' : 'Send'}
              </Button>
            </Col>
          </>
        }
      />
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(row) => row.id as string}
        loading={false}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination
          current={1}
          onChange={() => {}}
          total={1}
          pageSize={20}
          hideOnSinglePage
        />
      </Row>
    </Space>
  )
}

export default Default
