import { Divider, Typography } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { CSSProperties } from 'react'
import { theme } from 'styles'
import { ViewProjectInvoiceTemplate } from 'types/schema'

interface Props {
  invoice?: ViewProjectInvoiceTemplate | null
  style?: CSSProperties
}

export const SummarySection = (props: Props) => {
  const { invoice, style } = props

  return (
    <div style={style}>
      <Typography.Title level={4}>Bank Info</Typography.Title>
      <Divider />
      <DataRows
        data={[
          { label: 'Bank name', value: invoice?.bankAccount?.bankName || '-' },
          {
            label: 'Currency',
            value: invoice?.bankAccount?.currency?.name || '-',
          },
          {
            label: 'Account no.',
            value: invoice?.bankAccount?.accountNumber || '-',
          },
          {
            label: 'Account holder',
            value: invoice?.bankAccount?.ownerName || '-',
          },
          { label: 'Address', value: invoice?.bankAccount?.address || '-' },
          {
            label: 'SWIFT code',
            value: invoice?.bankAccount?.swiftCode || '-',
          },
          {
            label: 'Routing no.',
            value: invoice?.bankAccount?.routingNumber || '-',
          },
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
