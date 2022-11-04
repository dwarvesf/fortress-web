import React, { useEffect } from 'react'
import { Card, Button, Typography } from 'antd'
import { useAuthContext } from 'context/auth'
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
    margin-right: 10px;
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

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span {
    margin-left: 5px;
    margin-right: 5px;
  }

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
  const { isLogin, login } = useAuthContext()

  useEffect(() => {
    if (isLogin) {
      push(ROUTES.DASHBOARD)
    }
  }, [push, isLogin])

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeading level={2}>
          <svg width="32" height="32" viewBox="0 0 39 41">
            <title>logo</title>
            <g fillRule="nonzero" fill="none">
              <path
                d="M5.208 40.726c-2.804 0-5.074-2.279-5.074-5.093V5.093C.134 2.278 2.404 0 5.208 0l12.703.015c11.292 0 20.433 9.262 20.285 20.623-.149 11.183-9.438 20.088-20.582 20.088H5.208z"
                fill="#E13F5E"
              />
              <path
                d="M7.76 31.821h-.652a.634.634 0 0 1-.638-.64v-5.108c0-.357.282-.64.638-.64h5.09c.356 0 .638.283.638.64v.655c0 2.815-2.27 5.093-5.075 5.093zM7.108 16.528H22.97c2.804 0 5.075-2.278 5.075-5.092v-.61a.666.666 0 0 0-.668-.67H11.56c-2.805 0-5.075 2.278-5.075 5.092v.64c0 .358.282.64.623.64zM7.108 24.167h8.25c2.805 0 5.075-2.278 5.075-5.092v-.64a.634.634 0 0 0-.638-.64H7.108a.634.634 0 0 0-.638.64v5.092c.015.357.297.64.638.64z"
                fill="#FFF"
              />
            </g>
          </svg>
          Fortress
        </LoginHeading>
        <LoginWelcomeText>Welcome</LoginWelcomeText>
        <GoogleLoginButton onClick={() => login()}>
          <GoogleOutlined />
          <Text>Login with Google</Text>
        </GoogleLoginButton>

        <SocialLinks>
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
          <Link href="https://github.com/dwarvesf" passHref>
            <a target="_blank">
              <GithubFilled />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/company/dwarvesf/" passHref>
            <a target="_blank">
              <LinkedinFilled />
            </a>
          </Link>
          <Link href="https://twitter.com/dwarvesf" passHref>
            <a target="_blank">
              <TwitterOutlined />
            </a>
          </Link>
          <Link href="https://www.facebook.com/dwarvesf" passHref>
            <a target="_blank">
              <FacebookFilled />
            </a>
          </Link>
        </SocialLinks>
        <CopyrightText>A product of Dwarves, LLC</CopyrightText>
      </LoginCard>
    </LoginContainer>
  )
}

export default LoginPage
