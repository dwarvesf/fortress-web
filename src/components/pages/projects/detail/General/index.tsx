import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Col, Row, Space, notification } from 'antd'
import { AvatarArray } from 'components/common/AvatarArray'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableAvatar } from 'components/common/EditableAvatar'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { AsyncSelect } from 'components/common/Select'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { DATE_FORMAT } from 'constants/date'
import { Permission } from 'constants/permission'
import {
  ProjectFunction,
  ProjectImportance,
  projectFunctions,
  projectImportances,
} from 'constants/project'
import { useAuthContext } from 'context/auth'
import { GET_PATHS, client } from 'libs/apis'
import moment from 'moment'
import { mutate } from 'swr'
import { ViewProjectData } from 'types/schema'
import { format } from 'utils/date'
import { transformMetadataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'
import { EditProjectBankAccountModal } from './EditProjectBankAccountModal'
import { EditProjectCompanyInfoModal } from './EditProjectCompanyInfoModal'
import { EditProjectContactInfoModal } from './EditProjectContactInfoModal'
import { EditProjectGeneralInfoModal } from './EditProjectGeneralInfoModal'
import { MemberTable } from './MemberTable'
import { EditProjectClientModal } from './EditProjectClientModal'

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

  const {
    isOpen: isEditProjectBankAccountDialogOpen,
    onOpen: openEditProjectBankAccountDialog,
    onClose: closeEditProjectBankAccountDialog,
  } = useDisclosure()

  const {
    isOpen: isEditProjectCompanyInfoDialogOpen,
    onOpen: openEditProjectCompanyInfoDialog,
    onClose: closeEditProjectCompanyInfoDialog,
  } = useDisclosure()

  const {
    isOpen: isEditProjectClientDialogOpen,
    onOpen: openEditProjectClientDialog,
    onClose: closeEditProjectClientDialog,
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
                        value: data?.auditNotionID || '-',
                        permission: Permission.PROJECTS_READ_FULLACCESS,
                      },
                      {
                        label: 'Important',
                        value:
                          projectImportances[
                            data?.importantLevel as ProjectImportance
                          ] || '-',
                        permission: Permission.PROJECTS_READ_FULLACCESS,
                      },
                      {
                        label: 'Lead Rating',
                        value: data?.leadRating || '-',
                        permission: Permission.PROJECTS_READ_FULLACCESS,
                      },
                      {
                        label: 'Account Rating',
                        value: data?.accountRating || '-',
                        permission: Permission.PROJECTS_READ_FULLACCESS,
                      },
                      {
                        label: 'Delivery Rating',
                        value: data?.deliveryRating || '-',
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
                    label: 'Account Managers',
                    value: data.accountManagers?.length ? (
                      <Space direction="vertical">
                        {data.accountManagers.map((each) => (
                          <UserAvatar key={each.employeeID} user={each} />
                        ))}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Delivery Managers',
                    value: data.deliveryManagers?.length ? (
                      <Space direction="vertical">
                        {data.deliveryManagers.map((each) => (
                          <UserAvatar key={each.employeeID} user={each} />
                        ))}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Sale Persons',
                    value: data.salePersons?.length ? (
                      <Space direction="vertical">
                        {data.salePersons.map((each) => (
                          <UserAvatar key={each.employeeID} user={each} />
                        ))}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Bank Account"
              onEdit={openEditProjectBankAccountDialog}
              permission={Permission.PROJECTS_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Owner Name',
                    value: data.bankAccount ? (
                      <Space direction="vertical">
                        {data.bankAccount.ownerName}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Company Info"
              onEdit={openEditProjectCompanyInfoDialog}
              permission={Permission.PROJECTS_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Name',
                    value: data.companyInfo ? (
                      <Space direction="vertical">
                        {data.companyInfo.name}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                ]}
              />
            </EditableDetailSectionCard>
          </Col>
          <Col span={24} lg={{ span: 16 }}>
            <EditableDetailSectionCard
              title="Client"
              onEdit={openEditProjectClientDialog}
              permission={Permission.PROJECTS_EDIT}
            >
              <DataRows
                data={[
                  {
                    label: 'Name',
                    value: data.client ? (
                      <Space direction="vertical">{data.client.name}</Space>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Address',
                    value: data.client ? (
                      <Space direction="vertical">
                        {/* TODO: Types */}
                        {/* @ts-ignore */}
                        {data.client.address}
                      </Space>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Country',
                    value: data.client ? (
                      <Space direction="vertical">
                        {/* TODO: Types */}
                        {/* @ts-ignore */}
                        {data.client.country}
                      </Space>
                    ) : (
                      '-'
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
          countryID: data.country?.id,
        }}
        onClose={closeEditProjectGeneralInfoDialog}
        onAfterSubmit={mutateProject}
      />
      <EditProjectContactInfoModal
        projectID={data.id || ''}
        isOpen={isEditProjectContactInfoDialogOpen}
        initialValues={{ ...data }}
        onClose={closeEditProjectContactInfoDialog}
        onAfterSubmit={mutateProject}
      />
      <EditProjectBankAccountModal
        projectID={data.id || ''}
        isOpen={isEditProjectBankAccountDialogOpen}
        initialValues={{ ...data, bankAccountID: data.bankAccount?.id }}
        onClose={closeEditProjectBankAccountDialog}
        onAfterSubmit={mutateProject}
      />
      <EditProjectCompanyInfoModal
        projectID={data.id || ''}
        isOpen={isEditProjectCompanyInfoDialogOpen}
        initialValues={{ ...data, companyInfoID: data.companyInfo?.id }}
        onClose={closeEditProjectCompanyInfoDialog}
        onAfterSubmit={mutateProject}
      />
      <EditProjectClientModal
        projectID={data.id || ''}
        isOpen={isEditProjectClientDialogOpen}
        initialValues={{ ...data, clientID: data.client?.id }}
        onClose={closeEditProjectClientDialog}
        onAfterSubmit={mutateProject}
      />
    </>
  )
}
