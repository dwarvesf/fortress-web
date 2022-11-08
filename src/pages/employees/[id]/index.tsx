import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { noop } from '@dwarvesf/react-utils'
import { Card, Space, Tabs, Col, Row, Avatar, Select, Button } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { PageHeader } from 'components/common/PageHeader'
import { theme } from 'styles'

const SectionEditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="text"
      size="small"
      onClick={onClick}
      icon={
        <EditOutlined
          color={theme.colors.primary}
          style={{
            fontSize: 16,
            color: theme.colors.primary,
          }}
        />
      }
    />
  )
}

const Default = () => {
  return (
    <>
      <PageHeader title="John Doe" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Row gutter={[0, 24]}>
              <Col lg={{ span: 16 }}>
                <Card
                  title="Profile"
                  extra={<SectionEditButton onClick={noop} />}
                >
                  <Row gutter={24} wrap={false}>
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
                    <Col flex={1}>
                      <DataRows
                        data={[
                          {
                            label: 'Full Name',
                            value: 'John Doe',
                          },
                          { label: 'Email', value: 'johndoe@d.foundation' },
                          { label: 'Phone', value: 999999999 },
                          { label: 'Line Manager', value: 'Jane Doe' },
                          { label: 'Discord ID', value: 'john#123' },
                          { label: 'Github ID', value: 'john_doe' },
                        ]}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={{ span: 16 }}>
                <Card
                  title="Skills"
                  extra={<SectionEditButton onClick={noop} />}
                >
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
                </Card>
              </Col>
              <Col lg={{ span: 16 }}>
                <Card
                  title="Personal Info"
                  extra={<SectionEditButton onClick={noop} />}
                >
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
                        value: 'john.doe@gmail.com',
                      },
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </Space>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Document" key="2">
          Document
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Default
