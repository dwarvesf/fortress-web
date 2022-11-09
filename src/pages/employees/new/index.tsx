import { Col, Row, Space } from 'antd'
import { v4 as uuid4 } from 'uuid'
import { PageHeader } from 'components/common/PageHeader'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'

export const EmployeeStatus = {
  onboarding: 'Onboarding',
  probation: 'Probation',
  active: 'Active',
  leave: 'On leave',
}

export const EmployeeRole = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  blockchain: 'Blockchain',
  projectManager: 'Project manager',
}

export const EmployeeSeniority = {
  fresher: 'Fresher',
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
  staff: 'Staff',
  principle: 'Principle',
}

export const EmployeeAccountRole = {
  admin: 'Admin',
  member: 'Member',
}

export class CreateEmployeeFormValues {
  id?: string
  fullname?: string
  status?: keyof typeof EmployeeStatus
  email?: string
  personalEmail?: string
  role?: keyof typeof EmployeeRole
  seniority?: keyof typeof EmployeeSeniority
  salary?: number
  accountRole?: keyof typeof EmployeeAccountRole

  constructor() {
    this.id = uuid4()
  }
}

const CreateEmployeePage = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader title="New employee" />
      <Row>
        <Col span={24} lg={{ span: 16 }}>
          <EmployeeForm />
        </Col>
      </Row>
    </Space>
  )
}

export default CreateEmployeePage
