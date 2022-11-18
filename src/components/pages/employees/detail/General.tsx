import { UserOutlined } from '@ant-design/icons'
import { Space, Col, Row, Avatar, Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { ViewEmployeeData } from 'types/schema'

interface Props {
  data: ViewEmployeeData
}

export const General = (props: Props) => {
  const { data } = props

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Row gutter={[0, 24]}>
        <Col lg={{ span: 16 }}>
          <EditableDetailSectionCard title="Profile">
            <Row gutter={24}>
              <Col span={24} lg={{ span: 8 }}>
                <Space
                  direction="vertical"
                  size={24}
                  style={{ justifyContent: 'center' }}
                >
                  <Avatar
                    size={128}
                    icon={<UserOutlined />}
                    src={data.avatar}
                  />
                  <Select
                    style={{ width: '100%' }}
                    value="onboarding"
                    options={[
                      {
                        label: 'Onboarding',
                        value: 'onboarding',
                      },
                      {
                        label: 'Probation',
                        value: 'probation',
                      },
                      {
                        label: 'Active',
                        value: 'active',
                      },
                      {
                        label: 'On Leave',
                        value: 'on-leave',
                      },
                    ]}
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
                        <AvatarWithName user={data.lineManager} />
                      ) : (
                        '-'
                      ),
                    },
                    { label: 'Discord ID', value: data.discordID || '-' },
                    { label: 'Github ID', value: data.githubID || '-' },
                  ]}
                />
              </Col>
            </Row>
          </EditableDetailSectionCard>
        </Col>
        <Col lg={{ span: 16 }}>
          <EditableDetailSectionCard title="Skills">
            <DataRows
              data={[
                {
                  label: 'Roles',
                  value: data.positions
                    ?.map((position) => position.name)
                    .join(', '),
                },
                { label: 'Chapter', value: data.chapter?.name },
                { label: 'Seniority', value: data.seniority?.name },
                {
                  label: 'Stack',
                  value: data.stacks?.map((stack) => stack.name).join(', '),
                },
              ]}
            />
          </EditableDetailSectionCard>
        </Col>
        <Col lg={{ span: 16 }}>
          <EditableDetailSectionCard title="Personal Info">
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
      </Row>
    </Space>
  )
}
