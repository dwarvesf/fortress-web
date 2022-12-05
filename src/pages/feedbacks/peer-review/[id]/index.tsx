import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Modal,
  notification,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarArray } from 'components/common/AvatarArray'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { PeerReviewEventLink } from 'components/common/DetailLink'
import { NameArray } from 'components/common/NameArray'
import { PageHeader } from 'components/common/PageHeader'
import { PeerReviewEventDetailActions } from 'components/pages/PeerReview/PeerReviewEventDetailActions'
import { ProgressColumn } from 'components/pages/PeerReview/ProgressColumn'
import { statusColors } from 'constants/colors'
import { peerReviewStatuses } from 'constants/status'
import React, { useState } from 'react'
import {
  PeerReviewDetail,
  peerReviewEvent,
} from '../../../../components/pages/PeerReview/mockData'

const columns: ColumnsType<PeerReviewDetail> = [
  {
    title: 'Employee',
    key: 'employee',
    dataIndex: 'employee',
    render: (value) => <AvatarWithName user={value} />,
    fixed: 'left',
  },
  {
    title: 'Participants',
    key: 'participants',
    dataIndex: 'participants',
    render: (value) => <AvatarArray data={value} />,
  },
  {
    title: 'Completed',
    render: (value: PeerReviewDetail) => (
      <ProgressColumn
        done={value.totalCompletedSurveys}
        total={value.totalParticipants}
      />
    ),
  },
  {
    title: 'Sent',
    render: (value: PeerReviewDetail) =>
      `${value.totalSentSurveys}/${value.totalParticipants}`,
  },
  {
    title: '',
    render: () => <PeerReviewEventDetailActions />,
    fixed: 'right',
  },
]

const Default = () => {
  const { time, status, peerReviews = [] } = peerReviewEvent
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onSendServey = async () => {
    try {
      setIsLoading(true)

      notification.success({
        message: 'Peer performance servey sent successfully!',
      })

      setSelectedRowKeys([])
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not send peer performance servey',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmSendServey = () => {
    const selectedPeerReviews = peerReviews.filter((each) =>
      selectedRowKeys.includes(each.id || ''),
    )
    const participants = selectedPeerReviews.flatMap(
      (each) => each.participants || [],
    )
    if (participants.length === 0) {
      return
    }

    Modal.confirm({
      title: 'Send servey',
      content: (
        <>
          Do you want to send peer review feedback to{' '}
          <NameArray employees={participants} />?
        </>
      ),
      okText: 'Send',
      onOk: onSendServey,
    })
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title={
          <Space align="center">
            <PeerReviewEventLink>
              <LeftOutlined />
            </PeerReviewEventLink>
            <span>{time}</span>
            {status && (
              <div style={{ display: 'flex' }}>
                <Tag color={statusColors[status]}>
                  {peerReviewStatuses[status] || '-'}
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
                disabled={!selectedRowKeys.length || isLoading}
                loading={isLoading}
                onClick={confirmSendServey}
              >
                Send
              </Button>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown
                placement="bottomRight"
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item>Mark done</Menu.Item>
                    <Menu.Item>Delete</Menu.Item>
                  </Menu>
                }
              >
                <EllipsisOutlined style={{ fontSize: 24, fontWeight: 700 }} />
              </Dropdown>
            </Col>
          </>
        }
      />
      <Table
        dataSource={peerReviews}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        rowKey={(row) => row.id as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination current={1} onChange={() => {}} total={1} pageSize={10} />
      </Row>
    </Space>
  )
}

export default Default
