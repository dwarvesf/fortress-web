import { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'

const { Option } = Select

export const renderEmployeeOption = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.id}
    value={option.label.id}
    label={option.label.displayName}
  >
    <AvatarWithName isLink={false} user={option.label} />
  </Option>
)
