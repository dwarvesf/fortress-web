import { Icon } from '@iconify/react'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { TagArray } from 'components/common/TagArray'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import {
  ModelSeniority,
  ViewEmployeeData,
  ViewEmployeeProjectData,
  ViewPosition,
  ViewStack,
} from 'types/schema'

const columns: ColumnsType<ViewEmployeeData> = [
  {
    title: 'Name',
    key: 'name',
    render: (value?: ViewEmployeeData) =>
      value ? <UserAvatar user={value} /> : '-',
    fixed: 'left',
  },
  {
    title: 'Seniority',
    dataIndex: 'seniority',
    key: 'seniority',
    render: (value?: ModelSeniority) => value?.name || '-',
  },
  {
    title: 'Positions',
    key: 'positions',
    dataIndex: 'positions',
    render: (value?: ViewPosition[]) => (
      <TagArray value={value} maxTag={2} color="blue" />
    ),
  },
  {
    title: 'Stacks',
    key: 'stacks',
    dataIndex: 'stacks',
    render: (value: ViewStack[]) => (
      <TagArray value={value} maxTag={2} color="green" />
    ),
  },
  {
    title: 'Projects',
    key: 'projects',
    dataIndex: 'projects',
    render: (value?: ViewEmployeeProjectData[]) => (
      <TagArray
        value={value}
        content={(project) => (
          <Link href={ROUTES.PROJECT_DETAIL(project.code || '')}>
            <a>
              <Space size={4}>
                {project.name}
                <Icon icon="icon-park-outline:link" />
              </Space>
            </a>
          </Link>
        )}
        maxTag={2}
      />
    ),
  },
]

const dataSource: ViewEmployeeData[] = [
  {
    id: '5da297a1-21a7-4335-9e45-a3434598da04',
    createdAt: '2023-01-13T17:37:55.819497Z',
    updatedAt: '2023-01-18T06:40:23.667034Z',
    fullName: 'Nam Nguyen Test',
    displayName: 'Nam Nguyen Test',
    teamEmail: 'nhnam94@gmail.com',
    personalEmail: 'namnh.me@gmail.com',
    avatar: '',
    phoneNumber: '+84 988888888',
    address: 'abc',
    placeOfResidence: 'abc',
    country: '',
    city: '',
    mbti: '',
    gender: 'Male',
    horoscope: '',
    birthday: '1998-11-17T00:00:00Z',
    githubID: '',
    notionID: '',
    notionName: '',
    discordID: '',
    discordName: '',
    username: 'nhnam94',
    linkedInName: '',
    status: 'on-boarding',
    joinedDate: '2023-01-13T00:00:00Z',
    organization: '',
    seniority: {
      id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
      createdAt: '2022-11-07T09:50:25.714604Z',
      updatedAt: '2022-11-07T09:50:25.714604Z',
      name: 'Junior',
      code: 'junior',
      level: 1,
    },
    positions: [
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'frontend',
        name: 'Frontend',
      },
    ],
    stacks: [],
    roles: [
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'engineering-manager',
        name: 'Engineering Manager',
      },
    ],
    projects: [
      {
        id: '81ffc0a7-52ee-43fd-92ae-8603b02008e8',
        name: 'Icrosschain',
        deploymentType: 'official',
        status: 'active',
        positions: [],
        code: 'icrosschain',
        avatar: '',
        startDate: '2023-01-13T00:00:00Z',
      },
    ],
    chapters: [],
  },
]

export const EmployeeTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(row) => row.id || ''}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
