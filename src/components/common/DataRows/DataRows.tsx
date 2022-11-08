import { Col, Row } from 'antd'
import { Fragment } from 'react'
import { theme } from 'styles'

interface Props {
  data: {
    label: string
    value: React.ReactNode
  }[]
}

export const DataRows = (props: Props) => {
  const { data } = props

  return (
    <Row gutter={24}>
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <Col span={8} style={{ color: theme.colors.gray500 }}>
              {item.label}
            </Col>
            <Col span={16}>{item.value}</Col>
          </Fragment>
        )
      })}
    </Row>
  )
}
