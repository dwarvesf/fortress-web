import { Pagination, Row, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  MemberPeerReviewsStatuses,
  memberPeerReviewsStatuses,
} from 'constants/status'
import { useRouter } from 'next/router'
import React from 'react'
import {
  PeerReviewDetail,
  peerReviewEvent,
  memberPeerReviews,
  MemberPeerReviewDetail,
} from 'components/pages/feedbacks/peer-review/mockData'
import { MemberRelationship, memberRelationship } from 'constants/relationship'
import { MemberPeerReviewsAction } from 'components/pages/feedbacks/peer-review/MemberPeerReviewsAction'

const columns: ColumnsType<MemberPeerReviewDetail> = [
  {
    title: 'Reviewer',
    key: 'reviewer',
    dataIndex: 'reviewer',
    render: (value) => <AvatarWithName user={value} />,
    fixed: 'left',
  },
  {
    title: 'Relationship',
    key: 'relationship',
    dataIndex: 'relationship',
    render: (value) => memberRelationship[value as MemberRelationship],
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: MemberPeerReviewsStatuses) => (
      <Tag color={statusColors[value]}>
        {memberPeerReviewsStatuses[value] || '-'}
      </Tag>
    ),
  },
  {
    title: '',
    render: (value: PeerReviewDetail) => (
      <MemberPeerReviewsAction memberPeerReviewDetail={value} />
    ),
    fixed: 'right',
  },
]

const MemberPeerReviewsPage = () => {
  const { time, peerReviews = [] } = peerReviewEvent
  const selectedPeerReviews = peerReviews[0]

  const router = useRouter()

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        backHref={ROUTES.PEER_REVIEW_EVENT_DETAIL(router.query.id as string)}
        title={
          <Space align="center">
            {selectedPeerReviews.employee?.displayName} - Peer reviews
            <span>{time}</span>
          </Space>
        }
      />
      <Table
        dataSource={memberPeerReviews}
        columns={columns}
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

export default MemberPeerReviewsPage
