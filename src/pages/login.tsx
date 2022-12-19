import React, { useEffect } from 'react'
import { Card, Button, Typography, Row, Col } from 'antd'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { ROUTES } from 'constants/routes'
import styled from 'styled-components'
import { theme } from 'styles'
import {
  FacebookFilled,
  GithubFilled,
  GoogleOutlined as BaseGoogleOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { Logo } from 'components/common/Logo'
import { SEO } from 'components/common/SEO'

const LoginContainer = styled.div`
  background-color: ${theme.colors.gray100};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginCard = styled(Card)`
  border: 1px solid ${theme.colors.gray200};
  width: 330px;

  .ant-card-body {
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const LoginHeading = styled(Typography.Title)`
  display: flex;
  align-items: center;
  color: ${theme.colors.primary} !important;
  margin-bottom: 35px !important;

  svg {
    margin-right: 4px;
  }
`

const LoginWelcomeText = styled(Typography.Text)`
  font-weight: 600;
  margin-bottom: 20px;
`

const GoogleLoginButton = styled(Button)`
  display: flex;
  border: none;
  align-items: center;
  background-color: ${theme.colors.primary};
  border-radius: 7px;
  font-weight: 400;
  margin-bottom: 100px;

  &:hover {
    background-color: ${theme.colors.pink700};
  }

  * {
    color: ${theme.colors.white};
  }
`

const GoogleOutlined = styled(BaseGoogleOutlined)`
  svg {
    font-size: 17px;
    vertical-align: middle;
  }
`

const SocialLinks = styled(Row)`
  margin-bottom: 10px;

  svg {
    height: 20px;
    width: 20px;
    color: ${theme.colors.gray500};
    transition: 0.3s ease-out;
  }

  span:hover svg {
    color: ${theme.colors.gray600};
  }
`

const CopyrightText = styled(Typography.Text)`
  font-size: 14px;
  color: ${theme.colors.gray500};
`

const LoginPage = () => {
  const { Text } = Typography
  const { push } = useRouter()
  const { isAuthenticated, login } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = window.localStorage.getItem(LOGIN_REDIRECTION_KEY)

      push(redirectUrl || ROUTES.DASHBOARD).then(() => {
        window.localStorage.removeItem(LOGIN_REDIRECTION_KEY)
      })
    }
  }, [push, isAuthenticated])

  return (
    <>
      <SEO title="Login" />

      <LoginContainer>
        <LoginCard>
          <LoginHeading level={2}>
            <Row align="middle">
              <Logo />
              <span>Fortress</span>
            </Row>
          </LoginHeading>
          <LoginWelcomeText>Welcome</LoginWelcomeText>
          <GoogleLoginButton onClick={() => login()}>
            <GoogleOutlined />
            <Text>Login with Google</Text>
          </GoogleLoginButton>

          <SocialLinks gutter={8}>
            <Col>
              <Link href="https://discord.gg/Y2vvH9rQE4" passHref>
                <a target="_blank">
                  <span>
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <title>Discord</title>
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </span>
                </a>
              </Link>
            </Col>
            <Col>
              <Link href="https://github.com/dwarvesf" passHref>
                <a target="_blank">
                  <GithubFilled />
                </a>
              </Link>
            </Col>
            <Col>
              <Link href="https://www.linkedin.com/company/dwarvesf/" passHref>
                <a target="_blank">
                  <LinkedinFilled />
                </a>
              </Link>
            </Col>
            <Col>
              <Link href="https://twitter.com/dwarvesf" passHref>
                <a target="_blank">
                  <TwitterOutlined />
                </a>
              </Link>
            </Col>
            <Col>
              <Link href="https://www.facebook.com/dwarvesf" passHref>
                <a target="_blank">
                  <FacebookFilled />
                </a>
              </Link>
            </Col>
          </SocialLinks>
          <CopyrightText>A product of Dwarves, LLC</CopyrightText>
        </LoginCard>
      </LoginContainer>
    </>
  )
}

export default LoginPage
