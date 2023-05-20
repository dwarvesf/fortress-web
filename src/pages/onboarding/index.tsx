import { Col, Layout, Row, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { OnboardingForm } from 'components/pages/onboarding/OnboardingForm'

const Default = () => {
  return (
    <>
      <SEO title="Onboarding" />

      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Layout style={{ overflow: 'hidden' }}>
          <Content style={{ overflow: 'auto' }}>
            <div style={{ padding: 24 }}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <PageHeader title="Onboarding Form" />
                <Row>
                  <Col span={24} lg={{ span: 16 }}>
                    <OnboardingForm />
                  </Col>
                </Row>
              </Space>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Default
