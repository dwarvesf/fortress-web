import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
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
import { PageHeader } from 'components/common/PageHeader'
import { PeerReviewEventDetailActions } from 'components/pages/PeerReview/PeerReviewEventDetailActions'
import { ProgressColumn } from 'components/pages/PeerReview/ProgressColumn'
import { statusColors } from 'constants/colors'
import { peerReviewStatuses } from 'constants/status'
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
              <Button type="primary">Send</Button>
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
