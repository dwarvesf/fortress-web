import { Divider, Typography } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { CSSProperties } from 'react'
import { theme } from 'styles'

interface Props {
  style?: CSSProperties
}

export const SummarySection = (props: Props) => {
  const { style } = props
  return (
    <div style={style}>
      <Typography.Title level={4}>Bank Info</Typography.Title>
      <Divider />
      <DataRows
        data={[
          { label: 'Bank name', value: 'ACB' },
          { label: 'Currency', value: 'VND' },
          { label: 'Account no.', value: '0999999888' },
          { label: 'Account holder', value: 'Dwarves Foundation' },
          { label: 'Address', value: 'Hado Centrosa' },
          { label: 'SWIFT code', value: 'AVBWFPW' },
          { label: 'Routing no.', value: '-' },
        ]}
      />

      <Divider />

      <Typography.Title level={5}>Terms</Typography.Title>
      <div style={{ color: theme.colors.gray600 }}>
        *The cost per item includes the discount.
      </div>
      <div style={{ color: theme.colors.gray600 }}>
        **The discount here is applied to all items presented in the invoice,
        which will be applied in special cases.
      </div>
    </div>
  )
}
