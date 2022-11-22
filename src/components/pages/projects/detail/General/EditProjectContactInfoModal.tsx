import { Form, Input, Modal, notification, Space, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { ViewProjectData } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import { DefaultOptionType } from 'antd/lib/select'
import { AvatarWithName } from 'components/common/AvatarWithName'

const { Option } = Select

const customOptionRenderer = (
  option: Omit<DefaultOptionType, 'label'> & { label: any },
) => (
  <Option
    key={option.label.id}
    value={option.label.id}
    label={option.label.displayName}
  >
    <AvatarWithName isLink={false} user={option.label} />
  </Option>
)

type ProjectContactInfoFormValues = Pick<
  ViewProjectData,
  'clientEmail' | 'projectEmail'
> & { accountManager?: string; deliveryManager?: string }

interface Props {
  isOpen: boolean
  initialValues: ProjectContactInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectContactInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectContactInfoFormValues) => {
    try {
      setIsSubmitting(true)
      // await client.updateProfile(values)
      console.log(values)

      notification.success({
        message: "Project's contact info updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not update project's contact info",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const employeeOptionGetter = async () => {
    const { data } = await client.getEmployees({
      page: 1,
      size: 1000,
      workingStatus: 'full-time',
      preload: false,
    })
    return (
      data?.map(
        (metaItem: { id?: string; displayName?: string; avatar?: string }) => {
          return {
            value: metaItem.id,
            label: {
              id: metaItem.id,
              displayName: metaItem.displayName,
              avatar: metaItem.avatar,
            },
          }
        },
      ) || []
    )
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item
            label="Client email"
            name="clientEmail"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="Enter client email" className="bordered" />
          </Form.Item>
          <Form.Item
            label="Project email"
            name="projectEmail"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="Enter project email" className="bordered" />
          </Form.Item>
          <Form.Item
            label="Account manager"
            name="accountManager"
            required
            rules={[{ required: true }]}
          >
            <AsyncSelect
              placeholder="Select project's account manager"
              swrKeys={[GET_PATHS.getEmployees, 'account-manager']}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={customOptionRenderer}
            />
          </Form.Item>
          <Form.Item label="Delivery manager" name="deliveryManager">
            <AsyncSelect
              placeholder="Select project's delivery manager"
              swrKeys={[GET_PATHS.getEmployees, 'delivery-manager']}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={customOptionRenderer}
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
