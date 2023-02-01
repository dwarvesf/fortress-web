import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import {
  ModelSeniority,
  ViewBasicProjectInfo,
  ViewPosition,
  ViewProjectData,
} from 'types/schema'

interface RecordType {
  id?: string
  position?: ViewPosition
  seniority?: ModelSeniority
  project?: ViewProjectData
  type?: string
  createdAt?: string
}

const columns: ColumnsType<RecordType> = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    render: (value?: ViewPosition) => value?.name || '-',
    fixed: 'left',
  },
  {
    title: 'Seniority',
    dataIndex: 'seniority',
    key: 'seniority',
    render: (value?: ModelSeniority) => value?.name || '-',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (value?: ViewBasicProjectInfo) =>
      value ? <ProjectAvatar project={value} /> : '-',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value?: string) =>
      value ? format(new Date(value), DATE_FORMAT) : '-',
  },
]

const dataSource: RecordType[] = [
  {
    id: '1',
    position: {
      id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
      name: 'Frontend',
      code: 'frontend',
    },
    seniority: {
      id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
      name: 'Junior',
      code: 'junior',
    },
    project: {
      id: '81ffc0a7-52ee-43fd-92ae-8603b02008e8',
      avatar: '',
      code: 'icrosschain',
      name: 'Icrosschain',
    },
    type: 'Fulltime',
    createdAt: '2022-11-11T18:06:56.362902Z',
  },
  {
    id: '2',
    position: {
      id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
      name: 'Backend',
      code: 'backend',
    },
    seniority: {
      id: '01fb6322-d727-47e3-a242-5039ea4732fc',
      name: 'Senior',
      code: 'senior',
    },
    project: {
      id: '672a9da4-d037-4fde-821e-7d7a4bc0770a',
      avatar: '',
      code: 'droppii',
      name: 'Droppii',
    },
    type: 'Fulltime',
    createdAt: '2022-11-11T18:06:56.362902Z',
  },
]

export const PendingPositions = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(row) => row.id || ''}
      pagination={false}
      scroll={{ x: 'max-content', y: 370 }}
    />
  )
}
