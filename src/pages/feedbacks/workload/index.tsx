import { Pagination, Row, Space, Table } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/workload'
import { WorkloadAverage } from 'components/pages/feedbacks/workload/WorkloadAverage'
import {
  SurveyParticipantStatus,
  WorkloadAverageStatus,
} from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ToggleSendSurveysModal } from 'components/pages/feedbacks/workload/ToggleSendSurveysModal'
import { ViewEmployeeData } from 'types/schema'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { ROUTES } from 'constants/routes'
import { Setting } from '@icon-park/react'
import { SEO } from 'components/common/SEO'

const employees: ViewEmployeeData[] = [
  {
    id: 'd42a6fca-d3b8-4a48-80f7-a95772abda56',
    createdAt: '2022-11-17T11:06:03.279339Z',
    updatedAt: '2022-11-17T11:06:03.279339Z',
    fullName: 'Nguyễn Xuân Trường',
    displayName: 'Truong Nguyen',
    teamEmail: 'truongnx@dwarvesv.com',
    personalEmail: 'nguyentruong123@gmail.com',
    avatar:
      'https://s3-ap-southeast-1.amazonaws.com/fortress-images/8690187460973853786.png',
    phoneNumber: '0123456789',
    address: 'Nam Tu Liem',
    mbti: 'ISFJ-T',
    gender: 'Male',
    horoscope: 'Virgo',
    birthday: '1995-04-05T00:00:00Z',
    discordID: '205167514731151360',
    githubID: 'truongnguyen',
    notionID: '26581472',
    status: 'full-time',
    joinedDate: '2022-05-25T00:00:00Z',
    positions: [],
    stacks: [
      {
        id: 'fa0f4e46-7eab-4e5c-9d31-30489e69fe2e',
        name: 'React',
        code: 'react',
      },
    ],
    roles: [
      {
        id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
        code: 'member',
        name: 'Member',
      },
    ],
    projects: [
      {
        id: 'fa6c0bb0-56ad-45b5-a5ea-1a7aac0a2b0c',
        name: 'Fortress',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '44cbb343-f1b0-42a4-88ef-7d147f2e15ea',
        name: 'Testadd',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '2427909c-dacc-46de-8c39-516f85f190a3',
        name: 'DF',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: 'ad0fddb3-722f-422e-93f3-a1cf297df65d',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '7c530681-b0a9-4856-a8e6-cfe8ea729b73',
        name: 'Fortress',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '4060301a-9386-4525-9b46-bd2ffb9413a8',
        name: 'Fortress',
        deploymentType: 'official',
        positions: [],
      },
    ],
  },
  {
    id: 'dcfee24b-306d-4609-9c24-a4021639a11b',
    createdAt: '2022-11-17T11:06:03.264371Z',
    updatedAt: '2022-11-17T11:06:03.264371Z',
    fullName: 'Lê Việt Quỳnh',
    displayName: 'Quynh Le',
    teamEmail: 'quynhlv@dwarvesv.com',
    personalEmail: 'lequynh123@gmail.com',
    avatar:
      'https://s3-ap-southeast-1.amazonaws.com/fortress-images/4916620003720295041.png',
    phoneNumber: '0123456789',
    address: 'Binh Tan District',
    mbti: 'INTJ-S',
    gender: 'Female',
    horoscope: 'Virgo',
    birthday: '1998-12-10T00:00:00Z',
    discordID: '435844136025849876',
    githubID: 'quynhle',
    notionID: '29088916',
    status: 'full-time',
    joinedDate: '2021-05-17T00:00:00Z',
    positions: [
      {
        id: 'dac16ce6-9e5a-4ff3-9ea2-fdea4853925e',
        code: 'devops',
        name: 'Devops',
      },
    ],
    stacks: [
      {
        id: '0ecf47c8-cca4-4c30-94bb-054b1124c44f',
        name: 'Golang',
        code: 'golang',
      },
      {
        id: 'b403ef95-4269-4830-bbb6-8e56e5ec0af4',
        name: 'Google Cloud',
        code: 'gcloud',
      },
    ],
    roles: [
      {
        id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
        code: 'member',
        name: 'Member',
      },
    ],
    projects: [
      {
        id: 'e63af0e1-4fe9-4ec6-a0bb-d304cace2726',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: 'cd166a93-89fc-4246-ab35-4dab43881c4a',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: 'f32acc51-7a3b-4e2e-afb2-18085212f166',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '865b4b0c-4ee1-4138-b010-909355e90cb0',
        name: 'Testedit',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: 'b0fe3741-f82e-4cc0-be8c-1f907e341f0a',
        name: 'Testd',
        deploymentType: 'shadow',
        positions: [],
      },
      {
        id: '870ba85a-0af5-4d96-9671-d04071f2f818',
        name: 'DF',
        deploymentType: 'official',
        positions: [],
      },
    ],
  },
  {
    id: '38a00d4a-bc45-41de-965a-adc674ab82c9',
    createdAt: '2022-11-17T11:15:40.397372Z',
    updatedAt: '2022-11-17T11:15:40.397372Z',
    fullName: 'Nguyễn Hữu Nguyên',
    displayName: 'Nguyen Nguyen',
    teamEmail: 'nguyennh@dwarvesv.com',
    personalEmail: 'nguyennh123@gmail.com',
    avatar:
      'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2137109913829673789.png',
    phoneNumber: '0123456789',
    address: 'Q. Thu Duc , TP.HCM',
    mbti: 'ISTJ-A',
    gender: 'Male',
    horoscope: 'Libra',
    birthday: '1995-04-05T00:00:00Z',
    discordID: '205167514731151360',
    githubID: 'nguyennh',
    notionID: '26581472',
    status: 'probation',
    joinedDate: '2022-05-25T00:00:00Z',
    positions: [],
    stacks: [
      {
        id: 'fa0f4e46-7eab-4e5c-9d31-30489e69fe2e',
        name: 'React',
        code: 'react',
      },
    ],
    roles: [
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'admin',
        name: 'Admin',
      },
    ],
    projects: [
      {
        id: '253160b4-7428-4521-b90a-347b87869431',
        name: 'Testedit',
        deploymentType: 'official',
        positions: [],
      },
    ],
  },
  {
    id: 'ecea9d15-05ba-4a4e-9787-54210e3b98ce',
    createdAt: '2022-11-02T09:50:55.320669Z',
    updatedAt: '2022-11-02T09:50:55.320669Z',
    fullName: 'Nguyễn Hoàng Huy',
    displayName: 'Huy Nguyen',
    teamEmail: 'huynh@d.foundation',
    personalEmail: 'hoanghuy123@gmail.com',
    avatar:
      'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2830497479497502617.png',
    phoneNumber: '0123456789',
    address: 'Thu Duc City, Ho Chi Minh City',
    mbti: 'ENFJ-A',
    gender: 'Male',
    horoscope: 'Aquaman',
    birthday: '1990-01-02T00:00:00Z',
    discordID: '646649040771219476',
    githubID: 'huynguyen',
    notionID: '39523061',
    status: 'probation',
    joinedDate: '2018-09-01T00:00:00Z',
    positions: [
      {
        id: 'dac16ce6-9e5a-4ff3-9ea2-fdea4853925e',
        code: 'devops',
        name: 'Devops',
      },
      {
        id: '01fb6322-d727-47e3-a242-5039ea4732fc',
        code: 'blockchain',
        name: 'Blockchain',
      },
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'frontend',
        name: 'Frontend',
      },
      {
        id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
        code: 'backend',
        name: 'Backend',
      },
    ],
    stacks: [
      {
        id: '0ecf47c8-cca4-4c30-94bb-054b1124c44f',
        name: 'Golang',
        code: 'golang',
      },
      {
        id: 'fa0f4e46-7eab-4e5c-9d31-30489e69fe2e',
        name: 'React',
        code: 'react',
      },
      {
        id: 'b403ef95-4269-4830-bbb6-8e56e5ec0af4',
        name: 'Google Cloud',
        code: 'gcloud',
      },
    ],
    roles: [
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'admin',
        name: 'Admin',
      },
    ],
    projects: [
      {
        id: '870df3a4-d2e7-458a-a8d5-053b39ad04a2',
        name: 'Test',
        deploymentType: 'shadow',
        positions: [],
      },
      {
        id: 'b9ccfe09-0ec7-40f6-803c-8825ec978667',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '7310b51a-3855-498b-99ab-41aa82934269',
        name: 'Fortress',
        deploymentType: 'official',
        positions: [],
      },
    ],
  },
  {
    id: '608ea227-45a5-4c8a-af43-6c7280d96340',
    createdAt: '2022-11-02T09:50:55.320669Z',
    updatedAt: '2022-11-02T09:50:55.320669Z',
    fullName: 'Tiêu Quang Huy',
    displayName: 'Huy Tieu',
    teamEmail: 'huytq@d.foundation',
    personalEmail: 'huytq123@gmail.com',
    avatar:
      'https://s3-ap-southeast-1.amazonaws.com/fortress-images/3c420751-bb9a-4878-896e-2f10f3a633d6_avatar2535921977139052349.png',
    phoneNumber: '0123456789',
    address: 'Binh Thanh, Ho Chi Minh City',
    mbti: 'INFP-A',
    gender: 'Male',
    horoscope: 'Libra',
    birthday: '1990-01-02T00:00:00Z',
    discordID: '435844136025849876',
    githubID: 'huytq',
    notionID: '39523061',
    status: 'contractor',
    joinedDate: '2018-09-01T00:00:00Z',
    positions: [
      {
        id: '11ccffea-2cc9-4e98-9bef-3464dfe4dec8',
        code: 'frontend',
        name: 'Frontend',
      },
      {
        id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
        code: 'backend',
        name: 'Backend',
      },
      {
        id: 'dac16ce6-9e5a-4ff3-9ea2-fdea4853925e',
        code: 'devops',
        name: 'Devops',
      },
      {
        id: '01fb6322-d727-47e3-a242-5039ea4732fc',
        code: 'blockchain',
        name: 'Blockchain',
      },
    ],
    stacks: [
      {
        id: 'b403ef95-4269-4830-bbb6-8e56e5ec0af4',
        name: 'Google Cloud',
        code: 'gcloud',
      },
    ],
    roles: [
      {
        id: 'd796884d-a8c4-4525-81e7-54a3b6099eac',
        code: 'member',
        name: 'Member',
      },
    ],
    projects: [
      {
        id: 'fcd5c16f-40fd-48b6-9649-410691373eea',
        name: 'Fortress',
        deploymentType: 'shadow',
        positions: [],
      },
      {
        id: '4ffb504f-6fb4-4a03-8b90-61c903760559',
        name: 'Test proj',
        deploymentType: 'official',
        positions: [],
      },
      {
        id: '49544739-7a06-4736-8dcb-f09ae923d73c',
        name: 'Test',
        deploymentType: 'official',
        positions: [],
      },
    ],
  },
]

const mockWorkloadAverageData = [
  {
    title: 'Development',
    average: WorkloadAverageStatus.ALL_BORING_STUFF,
  },
  { title: 'Management', average: WorkloadAverageStatus.FEW_THINGS },
  { title: 'Learning', average: WorkloadAverageStatus.NOTHING_NEW },
  { title: 'Training', average: WorkloadAverageStatus.A_LOT },
]

export const mockProjectNames = [
  'SP Digital',
  'Setel',
  'Droppii',
  'Konvoy',
  'Fortress',
]

export const mockWorkloadData = {
  page: 1,
  size: 20,
  sort: '',
  total: 1,
  data: [
    {
      id: '1',
      title: 'Dec 23, 2022',
      type: 'survey',
      subtype: 'peer-review',
      status: 'in-progress',
      average: mockWorkloadAverageData,
      startDate: '2022-11-29T08:03:33.233262Z',
      endDate: '2023-05-29T08:03:33.233262Z',
      count: {
        total: 50,
        done: 50,
      },
      employees: employees.map((e, i) => ({
        ...e,
        projectName: mockProjectNames[i],
        workStatus: SurveyParticipantStatus.DONE,
        comments: Math.floor(Math.random() * 3),
        result: mockWorkloadAverageData,
      })),
    },
    {
      id: '2',
      title: 'Dec 16, 2022',
      type: 'survey',
      subtype: 'peer-review',
      status: 'in-progress',
      average: mockWorkloadAverageData,
      startDate: '2022-11-29T08:03:33.233262Z',
      endDate: '2023-05-29T08:03:33.233262Z',
      count: {
        total: 50,
        done: 0,
      },
      employees: employees.map((e, i) => ({
        ...e,
        projectName: mockProjectNames[i],
        workStatus: SurveyParticipantStatus.SENT,
        comments: Math.floor(Math.random() * 3),
        result: mockWorkloadAverageData,
      })),
    },
  ],
}

const columns: ColumnsType<any> = [
  {
    title: 'Time',
    key: 'title',
    dataIndex: 'title',
    render: (value) => value || '-',
    fixed: 'left',
  },
  {
    title: 'Done',
    render: (value) => (
      <ProgressColumn done={value.count?.done} total={value.count?.total} />
    ),
    width: '40%',
  },
  {
    title: 'Average',
    key: 'average',
    dataIndex: 'average',
    render: (value) => (
      <Space>
        {value.map((d: any) => (
          <WorkloadAverage data={d} />
        ))}
      </Space>
    ),
  },
  {
    title: '',
    render: (value) => <Actions record={value} />,
    fixed: 'right',
  },
]

const WorkloadPage = () => {
  const {
    isOpen: isToggleSendSurveyDialogOpen,
    onOpen: openToggleSendSurveyDialog,
    onClose: closeToggleSendSurveyDialog,
  } = useDisclosure()

  return (
    <>
      <SEO title="Feedbacks - Workload" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Feedbacks',
          },
          {
            label: 'Workload',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Work"
          rightRender={
            <Button type="primary" onClick={openToggleSendSurveyDialog}>
              <Setting size={24} />
            </Button>
          }
        />
        <Table
          dataSource={mockWorkloadData.data || []}
          columns={columns}
          rowKey={(row) => row.id as string}
          scroll={{ x: 'max-content' }}
        >
          <Row justify="end">
            <Pagination
              current={1}
              onChange={() => {}}
              total={1}
              pageSize={10}
              hideOnSinglePage
            />
          </Row>
        </Table>
      </Space>

      <ToggleSendSurveysModal
        onClose={closeToggleSendSurveyDialog}
        isOpen={isToggleSendSurveyDialogOpen}
      />
    </>
  )
}

export default WorkloadPage
