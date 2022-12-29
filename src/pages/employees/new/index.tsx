import { Col, Row, Space } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'
import { Permission } from 'constants/permission'
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
      <SEO title="Employees - New" />

      <Breadcrumb
        items={[
          {
            label: 'Employees',
            href: ROUTES.EMPLOYEES,
          },
          {
            label: 'New',
          },
        ]}
      />

      <AuthenticatedContent
        permission={Permission.EMPLOYEES_CREATE}
        fallback="403"
      >
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <PageHeader title="New employee" />
          <Row>
            <Col span={24} lg={{ span: 16 }}>
              <EmployeeForm />
            </Col>
          </Row>
        </Space>
      </AuthenticatedContent>
    </>
  )
}

export default CreateEmployeePage
