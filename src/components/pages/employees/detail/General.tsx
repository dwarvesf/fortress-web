import {
  Space,
  Col,
  Row,
  Avatar,
  Select,
  notification,
  Tooltip,
  Card,
  Table,
  Image,
} from 'antd'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import {
  ViewEmployeeData,
  ViewEmployeeProjectData,
  ViewPosition,
} from 'types/schema'
import { client, GET_PATHS } from 'libs/apis'
import { mutate } from 'swr'
import { useState } from 'react'
import { EmployeeStatus, employeeStatuses } from 'constants/status'
import { PreviewOpen, Star } from '@icon-park/react'
import moment from 'moment'
import { theme } from 'styles'
import { ColumnsType } from 'antd/lib/table'
import { ProjectLink } from 'components/common/DetailLink'
import { Button } from 'components/common/Button'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { EditProfileAvatarModal } from 'components/pages/profile/EditProfileAvatarModal'
import { EditPersonalInfoModal } from './EditPersonalInfoModal'
import { EditSkillsModal } from './EditSkillsModal'
import { EditGeneralInfoModal } from './EditGeneralInfoModal'

const projectColumns: ColumnsType<ViewEmployeeProjectData> = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
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
  {
    title: 'Action',
    render: (value) => (
      <ProjectLink id={value.id}>
        <Tooltip title="View Detail">
          <Button
            type="text-primary"
            size="small"
            icon={<PreviewOpen size={20} />}
          />
        </Tooltip>
      </ProjectLink>
    ),
  },
]

interface Props {
  data: ViewEmployeeData
  mutateEmployee: () => void
}

export const General = (props: Props) => {
  const { data, mutateEmployee } = props

  const [isLoading, setIsLoading] = useState(false)

  const onChangeStatus = async (value: string) => {
    try {
      setIsLoading(true)

      await client.updateEmployeeStatus(data.id || '', value)

      // Refetch user data
      notification.success({ message: 'Employee status updated successfully!' })
      mutate([GET_PATHS.getEmployees, data.id])
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not update employee status.',
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
            >
              <Row gutter={[24, 24]}>
                <Col span={24} lg={{ span: 8 }}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ justifyContent: 'center' }}
                  >
                    <Avatar
                      size={128}
                      onClick={openEditAvatarDialog}
                      style={{
                        border: `2px solid ${theme.colors.primary}`,
                        userSelect: 'none',
                        cursor: 'pointer',
                      }}
                      src={
                        data.avatar && (
                          <Image
                            src={data.avatar}
                            height="100%"
                            width="100%"
                            style={{ objectFit: 'cover' }}
                            preview={{ visible: false, mask: 'Edit' }}
                          />
                        )
                      }
                    >
                      {!data.avatar && (
                        <span style={{ fontSize: 64 }}>
                          {(data.fullName || data.displayName)
                            ?.slice(0, 1)
                            .toUpperCase()}
                        </span>
                      )}
                    </Avatar>
                    <EditProfileAvatarModal
                      isOpen={isEditAvatarDialogOpen}
                      onClose={closeEditAvatarDialog}
                      onAfterSubmit={mutateEmployee}
                      avatar={data.avatar}
                      name={data.fullName || data.displayName}
                    />
                    <Select
                      loading={isLoading}
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
                        value: (
                          <a href={`mailto:${data.teamEmail}`}>
                            {data.teamEmail}
                          </a>
                        ),
                      },
                      {
                        label: 'Phone',
                        value: data.phoneNumber ? (
                          <a href={`tel:${data.phoneNumber}`}>
                            {data.phoneNumber}
                          </a>
                        ) : (
                          '-'
                        ),
                      },
                      {
                        label: 'Line Manager',
                        value: data.lineManager ? (
                          <UserAvatar user={data.lineManager} />
                        ) : (
                          '-'
                        ),
                      },
                      { label: 'Discord ID', value: data.discordID || '-' },
                      {
                        label: 'Github ID',
                        value: (
                          <a
                            href={`https://github.com/${data.githubID || ''}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data.githubID || '-'}
                          </a>
                        ),
                      },
                      {
                        label: 'Notion ID',
                        value: data.notionID || '-',
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
            >
              <DataRows
                data={[
                  {
                    label: 'Positions',
                    value: data.positions
                      ?.map((position) => position.name)
                      .join(', '),
                  },
                  {
                    label: 'Chapters',
                    value:
                      data.chapters && data.chapters.length
                        ? data.chapters?.map((chapter, id) =>
                            chapter.leadID === data?.id ? (
                              <>
                                <Tooltip
                                  color={theme.colors.primary}
                                  title={`${chapter.name} lead`}
                                >
                                  {chapter.name}{' '}
                                  <Star
                                    style={{ color: theme.colors.primary }}
                                  />
                                </Tooltip>
                                {id !== (data.chapters?.length || 0) - 1
                                  ? ', '
                                  : ''}
                              </>
                            ) : (
                              `${chapter.name}${
                                id !== (data.chapters?.length || 0) - 1
                                  ? ', '
                                  : ''
                              }`
                            ),
                          )
                        : null,
                  },
                  { label: 'Seniority', value: data.seniority?.name },
                  {
                    label: 'Stack',
                    value: data.stacks?.map((stack) => stack.name).join(', '),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Personal Info"
              onEdit={openEditPersonalInfoDialog}
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
                  { label: 'Address', value: data.address },
                  {
                    label: 'Personal Email',
                    value: (
                      <a href={`mailto:${data.personalEmail}`}>
                        {data.personalEmail}
                      </a>
                    ),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <Card title="Projects">
              <Table
                dataSource={data.projects}
                columns={projectColumns}
                rowKey={(row) => row.id as string}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </Space>

      <EditGeneralInfoModal
        onClose={closeEditGeneralInfoDialog}
        isOpen={isEditGeneralInfoDialogOpen}
        initialValues={{
          discordID: data.discordID,
          email: data.teamEmail || '',
          fullName: data.fullName || '',
          githubID: data.githubID,
          lineManagerID: data.lineManager?.id || '',
          notionID: data.notionID,
          phone: data.phoneNumber || '',
        }}
        onAfterSubmit={() => mutate([GET_PATHS.getEmployees, data.id])}
      />

      <EditSkillsModal
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
        onAfterSubmit={() => mutate([GET_PATHS.getEmployees, data.id])}
      />

      <EditPersonalInfoModal
        onClose={closeEditPersonalInfoDialog}
        isOpen={isEditPersonalInfoDialogOpen}
        initialValues={{
          dob: data.birthday ? moment(data.birthday) : moment(),
          gender: data.gender || '',
          address: data.address || '',
          personalEmail: data.personalEmail || '',
        }}
        onAfterSubmit={() => mutate([GET_PATHS.getEmployees, data.id])}
      />
    </>
  )
}
