import { DefaultOptionType } from 'antd/lib/select'
import { Select, Tag } from 'antd'
import { statusColors } from 'constants/colors'

const { Option } = Select

export const renderStatusOption = (option: DefaultOptionType) => (
  <Option key={option.value} value={option.value} label={option.label}>
    <Tag color={statusColors[String(option.value!).toLowerCase()]}>
      {option.label || '-'}
    </Tag>
  </Option>
)
