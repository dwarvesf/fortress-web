import { LeftSmall } from '@icon-park/react'
import { Col, Row, Typography } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

const BackLink = styled.a`
  font-size: 20px;
`

interface Props {
  title: React.ReactNode
  rightRender?: React.ReactNode
  backHref?: string
}

export const PageHeader = (props: Props) => {
  const { title, rightRender, backHref } = props

  return (
    <Row gutter={[16, 16]}>
      {backHref && (
        <Col style={{ paddingTop: 4 }}>
          <Link href={backHref}>
            <BackLink>
              <LeftSmall size={24} />
            </BackLink>
          </Link>
        </Col>
      )}
      <Col flex={1}>
        <Typography.Title level={3}>{title}</Typography.Title>
      </Col>
      {rightRender && (
        <Col>
          <Row gutter={[8, 8]}>{rightRender}</Row>
        </Col>
      )}
    </Row>
  )
}
