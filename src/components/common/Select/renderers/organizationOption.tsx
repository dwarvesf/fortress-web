import { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'

const { Option } = Select

export const renderOrganizationOption = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.id}
    value={option.label.id}
    label={option.label.name}
  >
    <AvatarWithName
      avatarSize={16}
      avatar={option.label?.avatar || undefined}
      name={option.label.name}
    />
  </Option>
)
