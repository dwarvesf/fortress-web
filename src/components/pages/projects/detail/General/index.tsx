import { FileImageOutlined } from '@ant-design/icons'
import { Space, Col, Row, Avatar, notification, Card } from 'antd'
import { AvatarArray } from 'components/common/AvatarArray'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { AsyncSelect } from 'components/common/Select'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { client, GET_PATHS } from 'libs/apis'
import { mutate } from 'swr'
import { ViewProjectData } from 'types/schema'
import { transformMetadataToSelectOption } from 'utils/select'
import { MemberTable } from './MemberTable'

interface Props {
  data: ViewProjectData
}

export const General = (props: Props) => {
  const { data } = props

  const onChangeStatus = async (value: string) => {
    try {
      await client.updateProjectStatus(data.id || '', value)

      // Refetch project data
      notification.success({ message: 'Project status updated successfully!' })
      mutate([GET_PATHS.getProjects, data.id])
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not update project status.',
      })
    }
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Row gutter={[0, 24]}>
        <Col lg={{ span: 16 }}>
          <EditableDetailSectionCard title="Overview">
            <Row gutter={24}>
              <Col span={24} lg={{ span: 8 }}>
                <Space
                  direction="vertical"
                  size={24}
                  style={{ justifyContent: 'center' }}
                >
                  <Avatar size={128} icon={<FileImageOutlined />} />
                  <AsyncSelect
                    style={{ width: '100%', border: '1px solid #d9d9d9' }}
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
                    { label: 'Country', value: data.country },
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
        <Col lg={{ span: 16 }}>
          <EditableDetailSectionCard title="Contact Info">
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
                    <AvatarWithName user={data.accountManager} />
                  ) : (
                    ''
                  ),
                },
                {
                  label: 'Delivery Manager',
                  value: data.deliveryManager ? (
                    <AvatarWithName user={data.deliveryManager} />
                  ) : (
                    ''
                  ),
                },
              ]}
            />
          </EditableDetailSectionCard>
        </Col>
        <Col lg={{ span: 16 }}>
          <Card title="Members" bodyStyle={{ padding: '1px 0 0' }}>
            <MemberTable data={data.members || []} />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
