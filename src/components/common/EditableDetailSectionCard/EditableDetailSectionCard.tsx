import { EditOutlined } from '@ant-design/icons'
import { noop } from '@dwarvesf/react-utils'
import { Card, CardProps, Tooltip } from 'antd'
import { Button } from '../Button'

interface Props extends CardProps {
  onEdit?: () => void
}

const SectionEditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Edit">
      <Button
        type="text-primary"
        size="small"
        onClick={onClick}
        icon={
          <EditOutlined
            style={{
              fontSize: 16,
            }}
          />
        }
      />
    </Tooltip>
  )
}

export const EditableDetailSectionCard = (props: Props) => {
  const { onEdit = noop, ...rest } = props

  return <Card extra={<SectionEditButton onClick={onEdit} />} {...rest} />
}
