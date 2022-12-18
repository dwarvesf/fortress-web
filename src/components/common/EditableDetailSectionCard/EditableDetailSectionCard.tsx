import { noop } from '@dwarvesf/react-utils'
import { Edit } from '@icon-park/react'
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
          <Edit
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
