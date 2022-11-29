import { FileImageOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Form, Modal, notification, Space, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { Button } from 'components/common/Button'
import { useAuthContext } from 'context/auth'
import { client } from 'libs/apis'
import { useState } from 'react'
import { theme } from 'styles'
import { ViewEmployeeData } from 'types/schema'

type ProfileInfoFormValues = Pick<
  ViewEmployeeData,
  | 'phoneNumber'
  | 'discordID'
  | 'githubID'
  | 'personalEmail'
  | 'teamEmail'
  | 'notionID'
>

interface Props {
  isOpen: boolean
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProfileAvatarModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit } = props

  const { user } = useAuthContext()

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProfileInfoFormValues) => {
    try {
      setIsSubmitting(true)
      await client.updateProfile(values)

      notification.success({ message: 'Profile info updated successfully!' })

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
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Edit Profile"
      style={{ maxWidth: 400 }}
    >
      <Form form={form} onFinish={onSubmit}>
        <Space
          direction="vertical"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 300,
          }}
        >
          <Avatar size={175} icon={<FileImageOutlined />} src={user?.avatar} />
          <Upload
            name="file"
            headers={{ authorization: 'authorization-text' }}
            onChange={async (info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
              }
              if (info.file.status === 'done') {
                const form = new FormData()

                form.append('files', info.fileList[0].originFileObj as File)

                // test
                await client.uploadProfileAvatar(form)

                notification.success({
                  message: `${info.file.name} file uploaded successfully`,
                })
              } else if (info.file.status === 'error') {
                notification.error({
                  message: `${info.file.name} file upload failed.`,
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
            // itemRender={() => null}
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
      </Form>
    </Modal>
  )
}
