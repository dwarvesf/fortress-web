import { UploadOutlined } from '@ant-design/icons'
import { Avatar, Modal, notification, Space, Upload, Image, Spin } from 'antd'
import { Button } from 'components/common/Button'
import { useAuthContext } from 'context/auth'
import { client } from 'libs/apis'
import { useState } from 'react'
import { theme } from 'styles'
import { v4 as uuid4 } from 'uuid'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProfileAvatarModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit } = props
  const { user } = useAuthContext()

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
      setTimeout(() => setIsUploading(false), 500)
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not update profile info',
      })
    } finally {
      setIsSubmitting(false)
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
              <Spin size="large" style={{ color: 'red' }} />
            ) : (
              <Image
                src={user?.avatar}
                style={{ objectFit: 'cover', height: '100%' }}
                height={200}
                preview={false}
              />
            )
          }
          style={{
            border: `3px solid ${theme.colors.primary}`,
            marginBottom: 24,
          }}
        />
        <Upload
          name="file"
          accept="image/*"
          maxCount={1}
          itemRender={() => null}
          customRequest={(options) => {
            onSubmit(options.file as File)
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload image
          </Button>
        </Upload>
      </Space>
    </Modal>
  )
}
