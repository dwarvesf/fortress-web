import { noop } from '@dwarvesf/react-utils'
import { Card, CardProps, Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { AuthenticatedContent } from '../AuthenticatedContent'
import { Button } from '../Button'

interface Props extends CardProps {
  onEdit?: () => void
  permission?: string
}

const SectionEditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Edit">
      <Button
        type="text-primary"
        size="small"
        onClick={onClick}
        icon={<Icon icon="icon-park-outline:edit" width={20} />}
      />
    </Tooltip>
  )
}

export const EditableDetailSectionCard = (props: Props) => {
  const { onEdit = noop, permission, ...rest } = props

  return (
    <Card
      extra={
        <AuthenticatedContent permission={permission}>
          <SectionEditButton onClick={onEdit} />
        </AuthenticatedContent>
      }
      {...rest}
    />
  )
}
