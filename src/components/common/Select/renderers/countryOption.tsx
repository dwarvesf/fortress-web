import { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'

const { Option } = Select

export const renderCountryOption = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.code}
    value={option.label.code}
    label={option.label.name}
  >
    {option.label.name}
  </Option>
)
