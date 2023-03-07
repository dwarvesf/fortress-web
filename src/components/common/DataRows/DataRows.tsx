import { Col, ColProps, Row, Space, SpaceProps } from 'antd'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { theme } from 'styles'

interface Props {
  data: {
    label: string
    value: React.ReactNode
    permission?: Permission
  }[]
  labelColProps?: ColProps
  valueColProps?: ColProps
  wrapperProps?: SpaceProps
}

export const DataRows = (props: Props) => {
  const { data, labelColProps, valueColProps, wrapperProps } = props
  const { permissions } = useAuthContext()

  return (
    <Space direction="vertical" style={{ width: '100%' }} {...wrapperProps}>
      {data
        .filter(
          ({ permission }) => !permission || permissions.includes(permission),
        )
        .map((item, index) => {
          return (
            <Row gutter={[24, 8]} align="top" key={index}>
              <Col
                span={8}
                style={{ color: theme.colors.gray500 }}
                {...labelColProps}
              >
                {item.label}
              </Col>
              <Col span={16} {...valueColProps}>
                {item.value || '-'}
              </Col>
            </Row>
          )
        })}
    </Space>
  )
}
