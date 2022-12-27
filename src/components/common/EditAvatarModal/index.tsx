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
  type: 'profile' | 'employee' | 'project'
  id?: string
  avatar?: string
  name?: string
  title?: string
}

export const EditAvatarModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit, type, id, avatar, name, title } =
    props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const submit = async (file: File) => {
    try {
      setIsSubmitting(true)
      setIsUploading(true)

      const formData = new FormData()

      formData.append('file', file, `${uuid4() as string}.png`)

      switch (type) {
        case 'profile': {
          await client.uploadProfileAvatar(formData)
          notification.success({
            message: 'Profile avatar updated successfully!',
          })
          break
        }
        case 'employee': {
          await client.uploadEmployeeAvatar(id!, formData)
          notification.success({
            message: 'Employee avatar updated successfully!',
          })
          break
        }
        case 'project': {
          await client.uploadProjectAvatar(id!, formData)
          notification.success({
            message: 'Project avatar updated successfully!',
          })
          break
        }
        default:
      }

      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || `Could not update ${type} avatar`,
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
      title={title || 'Edit Avatar'}
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
            submit(options.file as File)
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
