import { Col, Row } from 'antd'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { Fragment } from 'react'
import { theme } from 'styles'

interface Props {
  data: {
    label: string
    value: React.ReactNode
    permission?: Permission
  }[]
}

export const DataRows = (props: Props) => {
  const { data } = props
  const { permissions } = useAuthContext()

  return (
    <Row gutter={[24, 8]} align="top">
      {data
        .filter(
          ({ permission }) => !permission || permissions.includes(permission),
        )
        .map((item, index) => {
          return (
            <Fragment key={index}>
              <Col span={8} style={{ color: theme.colors.gray500 }}>
                {item.label}
              </Col>
              <Col span={16}>{item.value || '-'}</Col>
            </Fragment>
          )
        })}
    </Row>
  )
}
