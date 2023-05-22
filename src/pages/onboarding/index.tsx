import { Col, Layout, Row, Space, notification } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { OnboardingForm } from 'components/pages/onboarding/OnboardingForm'
import { ROUTES } from 'constants/routes'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const Default = () => {
  const { push, query } = useRouter()
  const [isSubmittable, setIsSubmittable] = useState<boolean | null>(null)
  const init = useRef(true)

  useEffect(() => {
    const getInviteState = async () => {
      if (!query.code) return
      if (!init.current) return
      init.current = false
      try {
        const result = await client.getInviteState(query.code as string)
        if (result.data?.isCompleted === false) {
          setIsSubmittable(true)
        } else {
          throw new Error(
            result.data?.isCompleted === true
              ? 'Onboarding Form is submitted'
              : '',
          )
        }
      } catch (error: any) {
        setIsSubmittable(false)
        notification.error({
          message: error?.message || 'Invitation code is expired or incorrect',
        })
        setTimeout(() => push(ROUTES.HOME), 1000)
      }
    }
    getInviteState()
  }, [push, query.code])

  return (
    <>
      <SEO title="Onboarding" />

      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Layout style={{ overflow: 'hidden' }}>
          <Content style={{ overflow: 'auto' }}>
            <div style={{ padding: 24 }}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <PageHeader title="Onboarding Form" />
                {isSubmittable && (
                  <Row>
                    <Col span={24} lg={{ span: 16 }}>
                      <OnboardingForm />
                    </Col>
                  </Row>
                )}
              </Space>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Default
