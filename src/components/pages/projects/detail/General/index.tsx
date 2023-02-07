import { useDisclosure } from '@dwarvesf/react-hooks'
import { Space, Col, Row, notification, Card } from 'antd'
import { AvatarArray } from 'components/common/AvatarArray'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { AsyncSelect } from 'components/common/Select'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'utils/date'
import { mutate } from 'swr'
import moment from 'moment'
import { client, GET_PATHS } from 'libs/apis'
import { ViewProjectData } from 'types/schema'
import { transformMetadataToSelectOption } from 'utils/select'
import { EditableAvatar } from 'components/common/EditableAvatar'
import { getErrorMessage } from 'utils/string'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { ProjectFunction, projectFunctions } from 'constants/projectTypes'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { EditProjectContactInfoModal } from './EditProjectContactInfoModal'
import { EditProjectGeneralInfoModal } from './EditProjectGeneralInfoModal'
import { MemberTable } from './MemberTable'

interface Props {
  data: ViewProjectData
}

export const General = (props: Props) => {
  const { data } = props
  const { permissions } = useAuthContext()

  const isEditable = permissions.includes(Permission.PROJECTS_EDIT)

  const {
    isOpen: isEditProjectGeneralInfoDialogOpen,
    onOpen: openEditProjectGeneralInfoDialog,
    onClose: closeEditProjectGeneralInfoDialog,
  } = useDisclosure()

  const {
    isOpen: isEditProjectContactInfoDialogOpen,
    onOpen: openEditProjectContactInfoDialog,
    onClose: closeEditProjectContactInfoDialog,
  } = useDisclosure()

  const mutateProject = () => {
    mutate([GET_PATHS.getProjects, data.code])
  }

  const onChangeStatus = async (value: string) => {
    try {
      await client.updateProjectStatus(data.id || '', value)

      // Refetch project data
      notification.success({ message: 'Project status updated successfully!' })
      mutateProject()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not update project status'),
      })
    }
  }

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[0, 24]}>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Overview"
              onEdit={openEditProjectGeneralInfoDialog}
              permission={Permission.PROJECTS_EDIT}
            >
              <Row gutter={[24, 24]}>
                <Col span={24} lg={{ span: 8 }}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ justifyContent: 'center' }}
                  >
                    <EditableAvatar
                      onAfterSubmit={mutateProject}
                      type="project"
                      id={data.id}
                      avatar={data.avatar}
                      name={data.name}
                      editable={isEditable}
                    />
                    <AsyncSelect
                      style={{ width: '100%', border: '1px solid #d9d9d9' }}
                      disabled={!isEditable}
                      value={data.status}
                      optionGetter={async () =>
                        (await client.getProjectStatusMetadata()).data.map(
                          transformMetadataToSelectOption,
                        )
                      }
                      onChange={onChangeStatus}
                      swrKeys={GET_PATHS.getProjectStatusMetadata}
                    />
                  </Space>
                </Col>
                <Col span={24} lg={{ span: 16 }}>
                  <DataRows
                    data={[
                      {
                        label: 'Name',
                        value: data.name,
                      },
                      {
                        label: 'Technical Leads',
                        value: (data.technicalLeads || []).length ? (
                          <AvatarArray data={data.technicalLeads || []} />
                        ) : (
                          '-'
                        ),
                      },
                      {
                        label: 'Start Date',
                        value: data.startDate
                          ? format(data.startDate, DATE_FORMAT)
                          : '',
                      },
                      { label: 'Industry', value: data.industry },
                      { label: 'Country', value: data.country?.name || '-' },
                      {
                        label: 'Stacks',
                        value: (data.stacks || [])
                          .map((stack) => stack.name)
                          .join(', '),
                      },
                      {
                        label: 'Function',
                        value:
                          data.function &&
                          projectFunctions[data.function as ProjectFunction],
                      },
                      {
                        label: 'Notion ID',
                        value: data?.notionID || '-',
                        permission: Permission.PROJECTS_READ_FULLACCESS,
                      },
                    ]}
                  />
                </Col>
              </Row>
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Contact Info"
              onEdit={openEditProjectContactInfoDialog}
              permission={Permission.PROJECTS_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Client Email',
                    value: (data.clientEmail || []).length ? (
                      <Space direction="vertical">
                        {(data.clientEmail || []).map((mail) => (
                          <a
                            href={`mailto:${mail}`}
                            key={mail}
                            className="styled"
                          >
                            {mail}
                          </a>
                        ))}
                      </Space>
                    ) : (
                      '-'
                    ),
                    permission: Permission.PROJECTS_READ_FULLACCESS,
                  },
                  {
                    label: 'Project Email',
                    value: data.projectEmail ? (
                      <a
                        href={`mailto:${'data.projectEmail'}`}
                        className="styled"
                      >
                        {data.projectEmail}
                      </a>
                    ) : (
                      ''
                    ),
                  },
                  {
                    label: 'Account Manager',
                    value: data.accountManager ? (
                      <UserAvatar user={data.accountManager} />
                    ) : (
                      ''
                    ),
                  },
                  {
                    label: 'Delivery Manager',
                    value: data.deliveryManager ? (
                      <UserAvatar user={data.deliveryManager} />
                    ) : (
                      ''
                    ),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <TotalResultCount
              count={(data.members || []).length}
              permission={Permission.PROJECTS_CREATE}
            />

            <Card title="Members" bodyStyle={{ padding: '1px 0 0' }}>
              <MemberTable data={data.members || []} />
            </Card>
          </Col>
        </Row>
      </Space>
      <EditProjectGeneralInfoModal
        projectID={data.id || ''}
        isOpen={isEditProjectGeneralInfoDialogOpen}
        initialValues={{
          ...data,
          startDate: data.startDate ? moment(data.startDate) : undefined,
          stacks: (data.stacks || []).map((stack) => stack.id || ''),
          countryID: data.country?.id || '',
        }}
        onClose={closeEditProjectGeneralInfoDialog}
        onAfterSubmit={mutateProject}
      />
      <EditProjectContactInfoModal
        projectID={data.id || ''}
        isOpen={isEditProjectContactInfoDialogOpen}
        initialValues={{
          ...data,
          accountManagerID: data.accountManager?.employeeID || '',
          deliveryManagerID: data.deliveryManager?.employeeID || '',
        }}
        onClose={closeEditProjectContactInfoDialog}
        onAfterSubmit={mutateProject}
      />
    </>
  )
}
