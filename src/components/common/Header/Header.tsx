import { Col, Layout, Row, Space } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useUnreadFeedbackCount } from 'hooks/useUnreadFeedbackCount'
import { ROUTES } from 'constants/routes'
import { Icon } from '@iconify/react'
import { ProfileDropdown } from './ProfileDropdown'

const { Header: AntHeader } = Layout

const ButtonWrapper = styled.div`
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;

  &:hover {
    background: ${(props) => props.theme.colors.gray100};
  }
`

const UnreadDot = styled.span`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.primary};
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  color: #ffffff;
  padding: 0 4px;
`

export const Header = () => {
  const { unreadCount } = useUnreadFeedbackCount()

  return (
    <AntHeader>
      <Row
        align="middle"
        justify="space-between"
        style={{ width: '100%', height: '100%' }}
      >
        <Col>
          <div id="breadcrumb" />
        </Col>
        <Col>
          <Space>
            <Link href={ROUTES.INBOX}>
              <a>
                <ButtonWrapper>
                  <Icon icon="mdi:bell-outline" width={24} />
                  {unreadCount > 0 && (
                    <UnreadDot>{Math.min(unreadCount, 9)}+</UnreadDot>
                  )}
                </ButtonWrapper>
              </a>
            </Link>
            <ButtonWrapper>
              <ProfileDropdown />
            </ButtonWrapper>
          </Space>
        </Col>
      </Row>
    </AntHeader>
  )
}
