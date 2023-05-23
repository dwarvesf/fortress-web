import { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'

const { Option } = Select

export const renderCountryOption = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.name}
    value={option.label.name}
    label={option.label.name}
  >
    {option.label.name}
  </Option>
)
