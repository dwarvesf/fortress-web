import { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'
import { ProjectAvatar } from 'components/common/AvatarWithName'

const { Option } = Select

export const renderProjectOption = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.id}
    value={option.label.id}
    label={option.label.name}
  >
    <ProjectAvatar isLink={false} project={option.label} />
  </Option>
)
