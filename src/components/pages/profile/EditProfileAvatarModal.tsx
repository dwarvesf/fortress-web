import { EditOutlined } from '@ant-design/icons'
import { Avatar, Modal, notification, Space, Upload, Image, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
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
  const [form] = useForm()

  const [selectedAvatarSrc, setSelectedAvatarSrc] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRendering, setIsRendering] = useState(false)

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      const form = new FormData()

      form.append('file', selectedFile as File, `${uuid4() as string}.png`)

      await client.uploadProfileAvatar(form)

      notification.success({ message: 'Profile avatar updated successfully!' })

      onClose()
      onAfterSubmit()
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
      onCancel={() => {
        setSelectedAvatarSrc('')
        onClose()
        form.resetFields()
      }}
      onOk={() => {
        onSubmit()
        setTimeout(() => setSelectedAvatarSrc(''), 1000)
      }}
      okButtonProps={{ loading: isSubmitting }}
      title="Edit profile avatar"
      style={{ maxWidth: 400 }}
      okText="Save"
      destroyOnClose
    >
      <Space
        direction="vertical"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 300,
        }}
      >
        <Avatar
          size={200}
          src={
            isRendering ? (
              <Spin size="large" style={{ color: 'red' }} />
            ) : (
              <Image
                src={selectedAvatarSrc || user?.avatar}
                style={{ objectFit: 'cover', height: '100%' }}
                height={200}
                preview={false}
              />
            )
          }
        />
        <Upload
          name="file"
          headers={{ authorization: 'authorization-text' }}
          onChange={async (info) => {
            if (info.file.status !== 'uploading') {
              setIsRendering(true)
            }
            if (info.file.status === 'done') {
              setTimeout(() => {
                setIsRendering(false)

                // I put these inside a setTimeout because the thumbUrl is initially '' even when status is 'done'
                setSelectedAvatarSrc(info.file.thumbUrl!)
                setSelectedFile(info.file.originFileObj)
              }, 1000)

              notification.success({
                message: `${info.file.name} file loaded successfully`,
              })
            } else if (info.file.status === 'error') {
              notification.error({
                message: `Couldn't load ${info.file.name} file.`,
              })
            }
          }}
          beforeUpload={(file) => {
            const isImg =
              file.type === 'image/png' ||
              file.type === 'image/jpeg' ||
              file.type === 'image/jpg'
            if (!isImg) {
              notification.error({
                message: `${file.name} is not a png file`,
              })
            }
            return isImg || Upload.LIST_IGNORE
          }}
          maxCount={1}
          listType="picture"
          itemRender={() => null}
        >
          <Button
            type="link"
            style={{ color: theme.colors.primary }}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        </Upload>
      </Space>
    </Modal>
  )
}
