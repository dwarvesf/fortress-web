import { UserOutlined } from '@ant-design/icons'
import { Space, Col, Row, Avatar, Select, notification } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { DATE_FORMAT } from 'constants/date'
import { EmployeeStatus, employeeStatuses } from 'constants/status'
import { format } from 'date-fns'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { mutate } from 'swr'
import { ViewEmployeeData } from 'types/schema'

interface Props {
  data: ViewEmployeeData
}

export const General = (props: Props) => {
  const { data } = props

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
                    loading={isLoading}
                    style={{ width: '100%' }}
                    defaultValue={data.status}
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
