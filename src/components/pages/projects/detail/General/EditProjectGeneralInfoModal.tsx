import { Form, Input, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { RequestUpdateProjectGeneralInfoInput } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import { transformMetadataToSelectOption } from 'utils/select'
import { useRouter } from 'next/router'

type ProjectGeneralInfoFormValues =
  Partial<RequestUpdateProjectGeneralInfoInput>

interface Props {
  isOpen: boolean
  initialValues: ProjectGeneralInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectGeneralInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const {
    query: { id: productId },
  } = useRouter()

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectGeneralInfoFormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateProjectGeneralInfo(productId as string, values)

      notification.success({
        message: "Project's general info updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not update project's general info",
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
      title="Edit Project's General Info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter project's name" className="bordered" />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate">
            <Input
              type="date"
              placeholder="Select project's start date"
              className="bordered"
            />
          </Form.Item>
          <Form.Item
            label="Country"
            name="countryID"
            required
            rules={[{ required: true }]}
          >
            <AsyncSelect
              placeholder="Select project's country"
              swrKeys={[GET_PATHS.getCountryMetadata]}
              optionGetter={async () =>
                (await client.getCountryMetadata()).data.map(
                  transformMetadataToSelectOption,
                )
              }
            />
          </Form.Item>
          <Form.Item label="Stacks" name="stacks">
            <AsyncSelect
              mode="multiple"
              placeholder="Select project's stacks"
              swrKeys={[GET_PATHS.getStackMetadata]}
              optionGetter={async () =>
                ((await client.getStackMetadata()).data || []).map(
                  transformMetadataToSelectOption,
                )
              }
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
