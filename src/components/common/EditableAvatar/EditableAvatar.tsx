import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Image } from 'antd'
import { theme } from 'styles'
import { getFirstLetterCapitalized } from 'utils/string'
import { EditAvatarModal } from './EditAvatarModal'

interface Props {
  onAfterSubmit: () => void
  type: 'profile' | 'employee' | 'project'
  id?: string
  avatar?: string
  name?: string
  editable?: boolean
}

export const EditableAvatar = (props: Props) => {
  const { onAfterSubmit, type, id, avatar, name, editable = true } = props

  const {
    isOpen: isEditAvatarDialogOpen,
    onOpen: openEditAvatarDialog,
    onClose: closeEditAvatarDialog,
  } = useDisclosure()

  return (
    <>
      <Avatar
        size={128}
        onClick={editable ? openEditAvatarDialog : undefined}
        style={{
          border: `2px solid ${theme.colors.primary}`,
          userSelect: 'none',
          cursor: 'pointer',
        }}
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
    </>
  )
}
