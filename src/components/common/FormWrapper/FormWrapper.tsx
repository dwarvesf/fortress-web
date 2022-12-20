import { Card } from 'antd'
import { ReactElement } from 'react'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  footer?: ReactElement
}

export const FormWrapper = (props: Props) => {
  const { children, footer } = props

  return (
    <Card
      style={{ maxWidth: '100%' }}
      bodyStyle={{ padding: 0 }}
      bordered={false}
    >
      <Card className="rounded-top">{children}</Card>
      {footer && (
        <Card
          style={{ position: 'sticky', bottom: 0, zIndex: 20 }}
          className="rounded-bottom"
        >
          {footer}
        </Card>
      )}
    </Card>
  )
}
