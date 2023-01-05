import {
  Space,
  Col,
  Row,
  Select,
  notification,
  Tooltip,
  Card,
  Table,
  Tag,
} from 'antd'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import {
  ModelSeniority,
  RequestGetListEmployeeInput,
  ViewEmployeeData,
  ViewEmployeeProjectData,
  ViewMenteeInfo,
  ViewPosition,
} from 'types/schema'
import { client, GET_PATHS } from 'libs/apis'
import { ReactElement, useState } from 'react'
import { EmployeeStatus, employeeStatuses } from 'constants/status'
import { SVGIcon } from 'components/common/SVGIcon'
import { Star } from '@icon-park/react'
import moment from 'moment'
import { mutate } from 'swr'
import { theme } from 'styles'
import Link from 'next/link'
import { ROUTES } from 'constants/routes'
import { ColumnsType } from 'antd/lib/table'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import { EditableAvatar } from 'components/common/EditableAvatar'
import { getErrorMessage } from 'utils/string'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { EditPersonalInfoModal } from './EditPersonalInfoModal'
import { EditSkillsModal } from './EditSkillsModal'
import { EditGeneralInfoModal } from './EditGeneralInfoModal'

const projectColumns: ColumnsType<ViewEmployeeProjectData> = [
  {
    title: 'Name',
    render: (value) => <ProjectAvatar project={value} />,
  },
  {
    title: 'Position',
    key: 'positions',
    dataIndex: 'positions',
    render: (value?: ViewPosition[]) =>
      value?.map((each) => each.name).join(', ') || '-',
  },
  {
    title: 'Type',
    key: 'deploymentType',
    dataIndex: 'deploymentType',
    render: (value: DeploymentType) => deploymentTypes[value] || '-',
  },
]

const menteeColumns: ColumnsType<ViewMenteeInfo> = [
  {
    title: 'Name',
    render: (value) => <UserAvatar user={value} />,
  },
  {
    title: 'Position',
    key: 'positions',
    dataIndex: 'positions',
    render: (value?: ViewPosition[]) =>
      value?.map((each) => each.name).join(', ') || '-',
  },
  {
    title: 'Seniority',
    key: 'seniority',
    dataIndex: 'seniority',
    render: (value?: ModelSeniority) => value?.name || '-',
  },
]

const renderTagLinkWithFilter = ({
  filter,
  name,
  isRenderedAsTag = true,
  color,
}: {
  filter: RequestGetListEmployeeInput
  name: ReactElement | string
  isRenderedAsTag?: boolean
  color?: string
}) => {
  return (
    <Link
      href={`${ROUTES.EMPLOYEES}?filter=${JSON.stringify(
        new EmployeeListFilter(filter),
      )}`}
    >
      <a>
        {isRenderedAsTag ? (
          <Tag style={{ cursor: 'pointer' }} color={color}>
            {name}
          </Tag>
        ) : (
          name
        )}
      </a>
    </Link>
  )
}

interface Props {
  data: ViewEmployeeData
}

export const General = (props: Props) => {
  const { data } = props

  const [isLoading, setIsLoading] = useState(false)
  const { permissions } = useAuthContext()

  const isEditable = permissions.includes(Permission.EMPLOYEES_EDIT)

  const mutateEmployee = () => {
    mutate([GET_PATHS.getEmployees, data.username])
  }

  const onChangeStatus = async (value: string) => {
    try {
      setIsLoading(true)

      await client.updateEmployeeStatus(data.id || '', value)

      // Refetch user data
      notification.success({ message: 'Employee status updated successfully!' })
      mutateEmployee()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not update employee status'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const {
    isOpen: isEditGeneralInfoDialogOpen,
    onOpen: openEditGeneralInfoDialog,
    onClose: closeEditGeneralInfoDialog,
  } = useDisclosure()

  const {
    isOpen: isEditSkillsDialogOpen,
    onOpen: openEditSkillsDialog,
    onClose: closeEditSkillsDialog,
  } = useDisclosure()

  const {
    isOpen: isEditPersonalInfoDialogOpen,
    onOpen: openEditPersonalInfoDialog,
    onClose: closeEditPersonalInfoDialog,
  } = useDisclosure()

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[0, 24]}>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Profile"
              onEdit={openEditGeneralInfoDialog}
              permission={Permission.EMPLOYEES_EDIT}
            >
              <Row gutter={[24, 24]}>
                <Col span={24} lg={{ span: 8 }}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ justifyContent: 'center' }}
                  >
                    <EditableAvatar
                      onAfterSubmit={mutateEmployee}
                      type="employee"
                      id={data.id}
                      avatar={data.avatar}
                      name={data.displayName || data.fullName}
                      editable={isEditable}
                    />
                    <Select
                      loading={isLoading}
                      disabled={!isEditable}
                      style={{ width: '100%' }}
                      value={data.status}
                      onChange={onChangeStatus}
                      options={Object.keys(employeeStatuses).map((key) => {
                        return {
                          label: employeeStatuses[key as EmployeeStatus],
                          value: key,
                        }
                      })}
                    />
                  </Space>
                </Col>
                <Col span={24} lg={{ span: 16 }}>
                  <DataRows
                    data={[
                      {
                        label: 'Full Name',
                        value: data.fullName,
                      },
                      {
                        label: 'Email',
                        value: data.teamEmail || '-',
                      },
                      {
                        label: 'Phone',
                        value: String(data.phoneNumber) || '-',
                      },
                      {
                        label: 'Line Manager',
                        value: data.lineManager ? (
                          <UserAvatar user={data.lineManager} />
                        ) : (
                          '-'
                        ),
                      },
                      {
                        label: 'Discord',
                        value: (
                          <Space>
                            <SVGIcon name="discord" />
                            {data?.discordName || '-'}
                          </Space>
                        ),
                      },
                      {
                        label: 'Github',
                        value: (
                          <LinkWithIcon
                            href={
                              data?.githubID
                                ? `https://github.com/${data?.githubID}`
                                : ''
                            }
                            target="_blank"
                            rel="noreferrer"
                            icon={<SVGIcon name="github" />}
                          >
                            {data?.githubID || '-'}
                          </LinkWithIcon>
                        ),
                      },
                      {
                        label: 'Notion',
                        value: (
                          <Space>
                            <SVGIcon name="notion" />
                            {data?.notionName || '-'}
                          </Space>
                        ),
                      },
                      {
                        label: 'LinkedIn',
                        value: (
                          <Space>
                            <SVGIcon name="linkedin" />
                            {data?.linkedInName || '-'}
                          </Space>
                        ),
                      },
                    ]}
                  />
                </Col>
              </Row>
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Skills"
              onEdit={openEditSkillsDialog}
              permission={Permission.EMPLOYEES_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Positions',
                    value:
                      (data.positions || []).length > 0
                        ? data.positions?.map((position) => (
                            <span key={position.id}>
                              {renderTagLinkWithFilter({
                                filter: { positions: [position.code!] },
                                name: position.name || '-',
                                color: 'blue',
                              })}
                            </span>
                          ))
                        : '-',
                  },
                  {
                    label: 'Chapters',
                    value:
                      data.chapters && data.chapters.length
                        ? data.chapters?.map((chapter) => (
                            <span key={chapter.id}>
                              {renderTagLinkWithFilter({
                                filter: {
                                  chapters: [chapter.code!],
                                },
                                name:
                                  chapter.leadID === data?.id ? (
                                    <Tooltip title={`${chapter.name} lead`}>
                                      {chapter.name || '-'}{' '}
                                      <Star
                                        style={{
                                          color: theme.colors.primary,
                                        }}
                                      />
                                    </Tooltip>
                                  ) : (
                                    chapter.name || '-'
                                  ),
                                color: 'purple',
                              })}
                            </span>
                          ))
                        : '-',
                  },
                  {
                    label: 'Seniority',
                    value:
                      renderTagLinkWithFilter({
                        filter: {
                          seniorities: [data.seniority?.code!],
                        },
                        name: data.seniority?.name || '-',
                        isRenderedAsTag: false,
                      }) || '-',
                  },
                  {
                    label: 'Stack',
                    value:
                      (data.stacks || []).length > 0
                        ? data.stacks?.map((stack) => (
                            <span key={stack.id}>
                              {renderTagLinkWithFilter({
                                filter: {
                                  stacks: [stack.code!],
                                },
                                name: stack.name || '-',
                                color: 'green',
                              })}
                            </span>
                          ))
                        : '-',
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Personal Info"
              onEdit={openEditPersonalInfoDialog}
              permission={Permission.EMPLOYEES_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Date of Birth',
                    value: data.birthday
                      ? format(new Date(data.birthday), DATE_FORMAT)
                      : '',
                  },
                  { label: 'Gender', value: data.gender },
                  {
                    label: 'Personal Email',
                    value: data.personalEmail || '-',
                  },
                  { label: 'Address', value: data.address },
                  { label: 'City', value: data.city },
                  { label: 'Country', value: data.country },
                  {
                    label: 'Place of Residence',
                    value: data.placeOfResidence,
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <Card title="Projects" bodyStyle={{ padding: '1px 0 0 0' }}>
              <Table
                dataSource={data.projects}
                columns={projectColumns}
                rowKey={(row) => row.id as string}
                pagination={false}
                style={{ borderRadius: '0.5rem' }}
              />
            </Card>
          </Col>
          {!!data.mentees?.length && (
            <Col span={24} lg={{ span: 16 }}>
              <Card title="Mentees" bodyStyle={{ padding: '1px 0 0 0' }}>
                <Table
                  dataSource={data.mentees}
                  columns={menteeColumns}
                  rowKey={(row) => row.id as string}
                  pagination={false}
                  style={{ borderRadius: '0.5rem' }}
                />
              </Card>
            </Col>
          )}
        </Row>
      </Space>

      <EditGeneralInfoModal
        employeeID={data.id || ''}
        onClose={closeEditGeneralInfoDialog}
        isOpen={isEditGeneralInfoDialogOpen}
        initialValues={{
          email: data.teamEmail || '',
          fullName: data.fullName || '',
          displayName: data.displayName || '',
          lineManagerID: data.lineManager?.id || '',
          phone: data.phoneNumber || '',
          discordName: data.discordName || '',
          githubID: data.githubID || '',
          notionName: data.notionName || '',
          linkedInName: data.linkedInName || '',
        }}
        onAfterSubmit={mutateEmployee}
      />

      <EditSkillsModal
        employeeID={data.id || ''}
        onClose={closeEditSkillsDialog}
        isOpen={isEditSkillsDialogOpen}
        initialValues={{
          chapters: (data.chapters || []).map((c) => c.id || ''),
          leadingChapters: (data.chapters || [])
            .filter((c) => c.leadID === data.id)
            .map((c) => c.id || ''),
          positions: (data.positions || []).map((p) => p.id || ''),
          seniority: data.seniority?.id || '',
          stacks: (data.stacks || []).map((s) => s.id || ''),
        }}
        onAfterSubmit={mutateEmployee}
      />

      <EditPersonalInfoModal
        employeeID={data.id || ''}
        onClose={closeEditPersonalInfoDialog}
        isOpen={isEditPersonalInfoDialogOpen}
        initialValues={{
          dob: data.birthday ? moment(data.birthday) : moment(),
          gender: data.gender || '',
          personalEmail: data.personalEmail || '',
          address: data.address || '',
          country: data.country || '',
          city: data.city || '',
          placeOfResidence: data.placeOfResidence || '',
        }}
        onAfterSubmit={mutateEmployee}
      />
    </>
  )
}
