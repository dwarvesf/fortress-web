import { Card, Col, Row, Space } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'

export class CreateEmployeeFormValues {
  fullName?: string
  displayName?: string
  status?: string
  teamEmail?: string
  personalEmail?: string
  positions?: string[]
  seniorityID?: string
  salary?: number
  roleID?: string
}

const CreateEmployeePage = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader title="New employee" />
      <Row>
        <Col span={24} lg={{ span: 16 }}>
          <Card>
            <EmployeeForm />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

export default CreateEmployeePage
