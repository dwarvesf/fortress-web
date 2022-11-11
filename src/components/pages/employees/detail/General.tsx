import { UserOutlined } from '@ant-design/icons'
import { Space, Col, Row, Avatar, Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'

export const General = () => {
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
                  <Avatar size={128} icon={<UserOutlined />} />
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
                      value: 'John Doe',
                    },
                    {
                      label: 'Email',
                      value: (
                        <a href={`mailto:${'johndoe@d.foundation'}`}>
                          johndoe@d.foundation
                        </a>
                      ),
                    },
                    {
                      label: 'Phone',
                      value: <a href={`tel:${'999999999'}`}>999999999</a>,
                    },
                    {
                      label: 'Line Manager',
                      value: (
                        <AvatarWithName user={{ id: 1, name: 'Jane Doe' }} />
                      ),
                    },
                    { label: 'Discord ID', value: 'john#123' },
                    { label: 'Github ID', value: 'john_doe' },
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
                  value: 'Frontend Engineer',
                },
                { label: 'Chapter', value: 'Web' },
                { label: 'Seniority', value: 'Mid' },
                {
                  label: 'Stack',
                  value: ['React', 'CSS', 'Javascript'].join(', '),
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
                  value: '20/02/1995',
                },
                { label: 'Gender', value: 'Male' },
                { label: 'Address', value: '50 Truong Dinh, D3, HCM' },
                {
                  label: 'Personal Email',
                  value: (
                    <a href={`mailto:${'john.doe@gmail.com'}`}>
                      john.doe@gmail.com
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
