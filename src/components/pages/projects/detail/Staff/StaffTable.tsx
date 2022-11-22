import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Col, Row, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { ViewPosition, ViewProjectMember } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'

export const StaffTable = ({
  data,
  isLoading,
}: {
  data: ViewProjectMember[]
  isLoading: boolean
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) => <AvatarWithName user={value} />,
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value: ViewPosition[]) =>
          value?.map((position) => position.name).join(', '),
      },
      {
        title: 'Seniority',
        key: 'seniority',
        dataIndex: 'seniority',
        render: (value) => (value ? capitalizeFirstLetter(value) : '-'),
      },
      {
        title: 'Deployment Type',
        key: 'deploymentType',
        dataIndex: 'deploymentType',
        render: (value) => (value ? capitalizeFirstLetter(value) : '-'),
      },
      {
        title: 'Joined Date',
        key: 'joinedDate',
        dataIndex: 'joinedDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        title: 'Left Date',
        key: 'leftDate',
        dataIndex: 'leftDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        key: 'action',
        render: () => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <Button
                type="text-primary"
                size="small"
                icon={<EditOutlined />}
              />
            </Col>
            <Col>
              <Button
                type="text-primary"
                size="small"
                icon={<DeleteOutlined />}
              />
            </Col>
          </Row>
        ),
      },
    ] as ColumnsType<ViewProjectMember>
  }, [])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.employeeID || '-'}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
