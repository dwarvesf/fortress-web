import { FileImageOutlined } from '@ant-design/icons'
import { Space, Col, Row, Avatar, Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'

export const General = () => {
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
                  <Select
                    style={{ width: '100%' }}
                    value="onboarding"
                    options={[
                      {
                        label: 'Onboarding',
                        value: 'onboarding',
                      },
                      {
                        label: 'Active',
                        value: 'active',
                      },
                      {
                        label: 'Closed',
                        value: 'closed',
                      },
                      {
                        label: 'Paused',
                        value: 'paused',
                      },
                    ]}
                  />
                </Space>
              </Col>
              <Col span={24} lg={{ span: 16 }}>
                <DataRows
                  data={[
                    {
                      label: 'Name',
                      value: 'Fortress',
                    },
                    {
                      label: 'Lead',
                      value: (
                        <AvatarWithName user={{ id: 1, name: 'John Doe' }} />
                      ),
                    },
                    { label: 'Start Date', value: '20/10/2022' },
                    { label: 'Industry', value: 'Finance' },
                    { label: 'Country', value: 'US' },
                    {
                      label: 'Stack',
                      value: ['Go', 'MySQL', 'React', 'K8S'].join(', '),
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
                  value: (
                    <a href={`mailto:${'team@d.foundation'}`}>
                      team@d.foundation
                    </a>
                  ),
                },
                {
                  label: 'Project Email',
                  value: (
                    <a href={`mailto:${'team@d.foundation'}`}>
                      team@d.foundation
                    </a>
                  ),
                },
                {
                  label: 'Account Manager',
                  value: <AvatarWithName user={{ id: 1, name: 'John Doe' }} />,
                },
                {
                  label: 'Delivery Manager',
                  value: <AvatarWithName user={{ id: 1, name: 'John Doe' }} />,
                },
              ]}
            />
          </EditableDetailSectionCard>
        </Col>
      </Row>
    </Space>
  )
}
