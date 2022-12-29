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
import { socialLinks } from 'constants/socials'
import { SVGIcon } from 'components/common/SVGIcon'

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
  justify-content: center;
  width: max-content;
  max-width: 840px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  padding: 0;

  > .ant-card-body > div:first-child {
    display: none;

    @media only screen and (min-width: 769px) {
      display: block;
    }
  }

  @media only screen and (min-width: 769px) {
    justify-content: flex-start;
    width: 60%;
    padding: 30px;
  }
`

const LoginCard = styled(Card)`
  border: none !important;
  width: 250px;
  background-color: #fff0;

  .ant-card-body {
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    padding: 0;
  }

  @media only screen and (min-width: 769px) {
    width: 240px;
  }
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
              Welcome to{' '}
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 19,
                  color: theme.colors.primary,
                }}
              >
                Fortress
              </span>
              !
            </span>

            <GoogleLoginButton onClick={() => login()}>
              <SVGIcon
                name="google"
                style={{
                  position: 'absolute',
                  left: 10,
                }}
              />

              <Text>Login with Google</Text>
            </GoogleLoginButton>

            <SocialLinks gutter={12}>
              {socialLinks.map((s) => (
                <Col>
                  <Link href={s.url} passHref>
                    <a target="_blank">
                      <span>
                        <SVGIcon name={s.name} />
                      </span>
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
