import { useDisclosure } from '@dwarvesf/react-hooks'
import { Space, Col, Row, notification, Card } from 'antd'
import { AvatarArray } from 'components/common/AvatarArray'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { AsyncSelect } from 'components/common/Select'
import { DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { client, GET_PATHS } from 'libs/apis'
import { ViewProjectData } from 'types/schema'
import { transformMetadataToSelectOption } from 'utils/select'
import { EditableAvatar } from 'components/common/EditableAvatar'
import { getErrorMessage } from 'utils/string'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { EditProjectContactInfoModal } from './EditProjectContactInfoModal'
import { EditProjectGeneralInfoModal } from './EditProjectGeneralInfoModal'
import { MemberTable } from './MemberTable'

interface Props {
  data: ViewProjectData
  mutateProject: () => void
}

export const General = (props: Props) => {
  const { data, mutateProject } = props
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
              <Row gutter={24}>
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
                      swrKeys={[
                        GET_PATHS.getProjectStatusMetadata,
                        'async-select',
                      ]}
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
                        value: <AvatarArray data={data.technicalLeads || []} />,
                      },
                      {
                        label: 'Start Date',
                        value: data.startDate
                          ? format(new Date(data.startDate), DATE_FORMAT)
                          : '',
                      },
                      { label: 'Industry', value: data.industry },
                      { label: 'Country', value: data.country?.name || '-' },
                      {
                        label: 'Stack',
                        value: (data.stacks || [])
                          .map((stack) => stack.name)
                          .join(', '),
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
                    value: data.clientEmail ? (
                      <a href={`mailto:${data.clientEmail}`}>
                        {data.clientEmail}
                      </a>
                    ) : (
                      ''
                    ),
                  },
                  {
                    label: 'Project Email',
                    value: data.projectEmail ? (
                      <a href={`mailto:${'data.projectEmail'}`}>
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
          startDate: data.startDate
            ? format(new Date(data.startDate), SERVER_DATE_FORMAT)
            : undefined,
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
