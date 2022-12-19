import { Col, Row, Space } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'
import { ROUTES } from 'constants/routes'

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
    <>
      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Employees',
            href: ROUTES.EMPLOYEES,
          },
          {
            label: 'New',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader title="New employee" />
        <Row>
          <Col span={24} lg={{ span: 16 }}>
            <EmployeeForm />
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default CreateEmployeePage
