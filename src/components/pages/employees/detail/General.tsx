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
import { ReactElement, useMemo, useState } from 'react'
import {
  EmployeeStatus,
  employeeStatuses,
  ProjectMemberStatus,
} from 'constants/status'
import { SVGIcon } from 'components/common/SVGIcon'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { mutate } from 'swr'
import { theme } from 'styles'
import Link from 'next/link'
import { ROUTES } from 'constants/routes'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import {
  EditableAvatar,
  EditAvatarModal,
} from 'components/common/EditableAvatar'
import { getErrorMessage } from 'utils/string'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { AsyncSelect } from 'components/common/Select'
import { transformMetadataToSelectOption } from 'utils/select'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { EditPersonalInfoModal } from './EditPersonalInfoModal'
import { EditSkillsModal } from './EditSkillsModal'
import { EditGeneralInfoModal } from './EditGeneralInfoModal'

const projectColumns: (ColumnType<ViewEmployeeProjectData> & {
  permission?: string
})[] = [
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
    permission: Permission.EMPLOYEES_READ_PROJECTS_FULLACCESS,
  },
  {
    title: 'Joined Date',
    key: 'joinedDate',
    dataIndex: 'joinedDate',
    render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
    permission: Permission.EMPLOYEES_READ_PROJECTS_FULLACCESS,
  },
  {
    title: 'Left Date',
    key: 'leftDate',
    dataIndex: 'leftDate',
    render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
    permission: Permission.EMPLOYEES_READ_PROJECTS_FULLACCESS,
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

  // We'll be showing projects of the status users pick
  // By default, we show projects that the employee is active in
  const [viewProjectStatus, setViewProjectStatus] = useState(
    ProjectMemberStatus.ACTIVE,
  )
  const projects = useMemo(() => {
    // Active = every statuses except INACTIVE
    return data.projects?.filter((project) =>
      viewProjectStatus === ProjectMemberStatus.INACTIVE
        ? project.status === ProjectMemberStatus.INACTIVE
        : project.status !== ProjectMemberStatus.INACTIVE,
    )
  }, [data, viewProjectStatus])

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

  const onChangeRole = async (value: string) => {
    try {
      setIsLoading(true)

      await client.updateEmployeeRole(data.id || '', value)

      // Refetch user data
      notification.success({ message: 'Employee role updated successfully!' })
      mutateEmployee()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not update employee role'),
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

  const {
    isOpen: isEditAvatarDialogOpen,
    onOpen: openEditAvatarDialog,
    onClose: closeEditAvatarDialog,
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
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <EditableAvatar
                      onAfterSubmit={mutateEmployee}
                      type="employee"
                      id={data.id}
                      avatar={data.avatar}
                      name={data.displayName || data.fullName}
                      editable={false}
                    />
                    <Button
                      type="primary"
                      icon={<Icon icon="icon-park-outline:edit" width={20} />}
                      onClick={openEditAvatarDialog}
                    >
                      Edit
                    </Button>
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
                        permission:
                          Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
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
                        permission:
                          Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                      },
                      {
                        label: 'Notion',
                        value: (
                          <Space>
                            <SVGIcon name="notion" />
                            {data?.notionName || '-'}
                          </Space>
                        ),
                        permission:
                          Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                      },
                      {
                        label: 'LinkedIn',
                        value: (
                          <Space>
                            <SVGIcon name="linkedin" />
                            {data?.linkedInName || '-'}
                          </Space>
                        ),
                        permission:
                          Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                      },
                    ].flatMap(({ permission, ...item }) =>
                      permission && !permissions.includes(permission)
                        ? []
                        : [item],
                    )}
                  />
                </Col>
              </Row>
            </EditableDetailSectionCard>
          </Col>
          <AuthenticatedContent permission={Permission.EMPLOYEES_FULLACCESS}>
            <Col span={24} lg={{ span: 16 }}>
              <Card title="Permissions">
                <DataRows
                  data={[
                    {
                      label: 'Status',
                      value: (
                        <Select
                          loading={isLoading}
                          style={{ width: '100%', maxWidth: 300 }}
                          value={data.status}
                          onChange={onChangeStatus}
                          options={Object.keys(employeeStatuses).map((key) => {
                            return {
                              label: employeeStatuses[key as EmployeeStatus],
                              value: key,
                            }
                          })}
                        />
                      ),
                    },
                    {
                      label: 'Role',
                      value: (
                        <AsyncSelect
                          optionGetter={async () => {
                            const { data } =
                              await client.getAccountRolesMetadata()
                            return (
                              data?.map(transformMetadataToSelectOption) || []
                            )
                          }}
                          swrKeys={GET_PATHS.getAccountRoleMetadata}
                          placeholder="Select account role"
                          style={{
                            width: '100%',
                            maxWidth: 300,
                          }}
                          value={data.roles?.[0]?.id}
                          onChange={onChangeRole}
                        />
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </AuthenticatedContent>
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
                                      <Icon
                                        icon="icon-park-outline:star"
                                        width={10}
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
                    permission:
                      Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                  },
                  {
                    label: 'Address',
                    value: data.address,
                    permission:
                      Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                  },
                  {
                    label: 'City',
                    value: data.city,
                    permission:
                      Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                  },
                  {
                    label: 'Country',
                    value: data.country,
                    permission:
                      Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                  },
                  {
                    label: 'Place of Residence',
                    value: data.placeOfResidence,
                    permission:
                      Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
                  },
                ].flatMap(({ permission, ...item }) =>
                  permission && !permissions.includes(permission) ? [] : [item],
                )}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <Card
              title="Projects"
              bodyStyle={{ padding: '1px 0 0 0' }}
              extra={
                <AuthenticatedContent
                  permission={Permission.EMPLOYEES_READ_PROJECTS_FULLACCESS}
                >
                  <Select
                    options={[
                      { label: 'Active', value: ProjectMemberStatus.ACTIVE },
                      {
                        label: 'Inactive',
                        value: ProjectMemberStatus.INACTIVE,
                      },
                    ]}
                    value={viewProjectStatus}
                    onChange={setViewProjectStatus}
                  />
                </AuthenticatedContent>
              }
            >
              <Table
                dataSource={projects}
                columns={projectColumns.flatMap(({ permission, ...col }) =>
                  permission && !permissions.includes(permission) ? [] : [col],
                )}
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

      <EditAvatarModal
        isOpen={isEditAvatarDialogOpen}
        onClose={closeEditAvatarDialog}
        onAfterSubmit={mutateEmployee}
        type="employee"
        avatar={data.avatar}
        name={data.displayName || data.fullName}
      />
    </>
  )
}
