import { Col, Row, Space } from 'antd'
import { Button } from 'components/common/Button'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { InvoiceForm } from 'components/pages/invoice/new/InvoiceForm'

const Default = () => {
  return (
    <>
      <SEO title="Invoice - New" />

      <Breadcrumb
        items={[
          {
            label: 'Invoice',
          },
          {
            label: 'New',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="New invoice"
          rightRender={<Button type="primary">Send</Button>}
        />
        <Row>
          <Col span={24}>
            <InvoiceForm />
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default Default
