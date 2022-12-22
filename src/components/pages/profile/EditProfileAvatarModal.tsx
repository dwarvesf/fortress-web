import { UploadPicture } from '@icon-park/react'
import {
  Avatar,
  Modal,
  notification,
  Space,
  Upload,
  Image,
  Spin,
  Row,
} from 'antd'
import { Button } from 'components/common/Button'
import { client } from 'libs/apis'
import { useState } from 'react'
import { theme } from 'styles'
import { getFirstLetterCapitalized } from 'utils/string'
import { v4 as uuid4 } from 'uuid'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAfterSubmit: () => void
  avatar?: string
  name?: string
}

export const EditProfileAvatarModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit, avatar, name } = props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const onSubmit = async (file: File) => {
    try {
      setIsSubmitting(true)
      setIsUploading(true)

      const formData = new FormData()

      formData.append('file', file, `${uuid4() as string}.png`)

      await client.uploadProfileAvatar(formData)

      notification.success({ message: 'Profile avatar updated successfully!' })

      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not update profile info',
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsUploading(false), 500)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      okButtonProps={{ loading: isSubmitting }}
      title="Edit Profile Avatar"
      style={{ maxWidth: 400 }}
      destroyOnClose
      footer={null}
    >
      <Space
        direction="vertical"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: 24,
        }}
      >
        <Avatar
          size={200}
          src={
            isUploading ? (
              <Row
                align="middle"
                justify="center"
                style={{ width: '100%', height: '100%' }}
              >
                <Spin size="large" style={{ color: 'red' }} />
              </Row>
            ) : (
              avatar && (
                <Image
                  src={avatar}
                  height="100%"
                  width="100%"
                  style={{ objectFit: 'cover' }}
                  preview={false}
                />
              )
            )
          }
          style={{
            border: `3px solid ${theme.colors.primary}`,
            marginBottom: 24,
            fontSize: 100,
            userSelect: 'none',
          }}
        >
          {!avatar && getFirstLetterCapitalized(name)}
        </Avatar>
        <Upload
          name="file"
          accept="image/*"
          maxCount={1}
          itemRender={() => null}
          customRequest={(options) => {
            onSubmit(options.file as File)
          }}
        >
          <Button type="primary" icon={<UploadPicture size={20} />}>
            Upload image
          </Button>
        </Upload>
      </Space>
    </Modal>
  )
}
