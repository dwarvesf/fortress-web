import React, { useEffect } from 'react'
import { Card, Button, Typography, Row, Col } from 'antd'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { ROUTES } from 'constants/routes'
import styled from 'styled-components'
import { theme } from 'styles'
import Link from 'next/link'
import { Logo } from 'components/common/Logo'
import { SEO } from 'components/common/SEO'
import { brandLinks } from 'constants/links'

const LoginContainer = styled.div`
  background-color: ${theme.colors.primary};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginCardWrapper = styled(Card)`
  background-color: ${theme.colors.white};
  align-items: center;
  width: 60%;
  max-width: 840px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  padding: 30px;
`

const LoginCard = styled(Card)`
  border: none !important;
  width: 240px;
  background-color: #fff0;

  .ant-card-body {
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    padding: 0;
  }
`

const GradientText = styled.span`
  font-weight: 600;
  font-size: 19px;
  background-image: linear-gradient(to right, ${theme.colors.primary}, #726cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const GoogleLoginButton = styled(Button)`
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
  background-color: ${theme.colors.primary};
  font-weight: 500;
  margin-bottom: 100px;
  width: 100%;
  position: relative;

  &:hover {
    background-color: ${theme.colors.pink700};
  }

  * {
    color: ${theme.colors.white};
  }
`

const SocialLinks = styled(Row)`
  margin-bottom: 10px;
  justify-content: space-between;

  svg {
    height: 16px;
    width: 16px;
    color: ${theme.colors.gray500};
    transition: 0.3s ease-out;
  }

  span:hover svg {
    color: ${theme.colors.gray600};
  }
`

const LoginPage = () => {
  const { Text } = Typography
  const { push } = useRouter()
  const { isAuthenticated, login } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = window.localStorage.getItem(LOGIN_REDIRECTION_KEY)

      push(redirectUrl || ROUTES.HOME).then(() => {
        window.localStorage.removeItem(LOGIN_REDIRECTION_KEY)
      })
    }
  }, [push, isAuthenticated])

  return (
    <>
      <SEO title="Login" />

      <LoginContainer>
        <LoginCardWrapper>
          <div
            style={{
              width: 445,
              minHeight: 'calc(100% + 100px)',
              top: -50,
              right: -50,
              position: 'absolute',
              backgroundImage: 'url(dwarves.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
              backgroundAttachment: 'scroll',
            }}
          />

          <LoginCard>
            <div style={{ marginBottom: 40 }}>
              <Logo hasText />
            </div>

            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Welcome to <GradientText>Fortress</GradientText>!
            </span>

            <GoogleLoginButton onClick={() => login()}>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                style={{
                  width: 16,
                  height: 16,
                  color: '#fff',
                  position: 'absolute',
                  left: 10,
                }}
              >
                <title>Google</title>
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>

              <Text>Login with Google</Text>
            </GoogleLoginButton>

            <SocialLinks gutter={12}>
              {brandLinks.map((b) => (
                <Col>
                  <Link href={b.url} passHref>
                    <a target="_blank">
                      <span>{b.icon}</span>
                    </a>
                  </Link>
                </Col>
              ))}
            </SocialLinks>

            <span style={{ fontSize: 14, color: theme.colors.gray500 }}>
              A product of Dwarves, LLC
            </span>
          </LoginCard>
        </LoginCardWrapper>
      </LoginContainer>
    </>
  )
}

export default LoginPage
