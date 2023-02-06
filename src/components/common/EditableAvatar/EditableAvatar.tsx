import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Avatar, Image, Space } from 'antd'
import { theme } from 'styles'
import { getFirstLetterCapitalized } from 'utils/string'
import { Button } from '../Button'
import { EditAvatarModal } from './EditAvatarModal'

interface Props {
  onAfterSubmit: () => void
  type: 'profile' | 'employee' | 'project'
  id?: string
  avatar?: string
  name?: string
  editable?: boolean
  hasEditButton?: boolean
}

export const EditableAvatar = (props: Props) => {
  const {
    onAfterSubmit,
    type,
    id,
    avatar,
    name,
    editable = true,
    hasEditButton = false,
  } = props

  const {
    isOpen: isEditAvatarDialogOpen,
    onOpen: openEditAvatarDialog,
    onClose: closeEditAvatarDialog,
  } = useDisclosure()

  return (
    <Space
      direction="vertical"
      size={24}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Avatar
        size={128}
        onClick={editable ? openEditAvatarDialog : undefined}
        style={{
          border: `2px solid ${theme.colors.primary}`,
          userSelect: 'none',
          cursor: 'pointer',
        }}
        // since mask is only available in Image,
        // we copy its className to a div to fake a mask in case there is no avatar
        src={
          avatar ? (
            <Image
              src={avatar}
              height="100%"
              width="100%"
              style={{ objectFit: 'cover' }}
              preview={
                editable
                  ? { visible: false, mask: 'Edit avatar' }
                  : { mask: <span style={{ fontSize: 16 }}>View avatar</span> }
              }
            />
          ) : (
            <div
              className="ant-image"
              style={{
                width: '100%',
                height: '100%',
                background: '#ccc',
              }}
            >
              <span style={{ fontSize: 64 }}>
                {getFirstLetterCapitalized(name)}
              </span>
              <div className="ant-image-mask">
                <span style={{ fontSize: 16 }}>
                  {editable ? 'Edit avatar' : 'View avatar'}
                </span>
              </div>
            </div>
          )
        }
      />
      {editable && (
        <EditAvatarModal
          isOpen={isEditAvatarDialogOpen}
          onClose={closeEditAvatarDialog}
          {...{ onAfterSubmit, type, id, avatar, name }}
        />
      )}
      {hasEditButton ? (
        <Button
          type="primary"
          icon={<Icon icon="icon-park-outline:edit" width={16} />}
          onClick={openEditAvatarDialog}
        >
          Edit
        </Button>
      ) : null}
    </Space>
  )
}
