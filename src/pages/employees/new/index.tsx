import { Col, Row, Space } from 'antd'
import { v4 as uuid4 } from 'uuid'
import { PageHeader } from 'components/common/PageHeader'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'

export class CreateEmployeeFormValues {
  id?: string
  fullname?: string
  status?: string
  email?: string
  personalEmail?: string
  positions?: string | string[]
  seniority?: string
  salary?: number
  accountRole?: string

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
