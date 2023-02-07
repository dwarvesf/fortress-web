import { Col, Row, Space } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { EmployeeForm } from 'components/pages/employees/EmployeeForm'
import { ROUTES } from 'constants/routes'

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
