import { Form, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { transformClientDataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'

// TODO: Types
type ProjectClientFormValues = Partial<any>

interface Props {
  projectID: string
  isOpen: boolean
  initialValues: ProjectClientFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectClientModal = (props: Props) => {
  const { projectID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectClientFormValues) => {
    try {
      setIsSubmitting(true)

      // TODO: Types
      await client.updateProjectGeneralInfo(projectID, {
        // NOTE: We need these values to be able to reuse the updateProjectGeneralInfo function
        name: initialValues.name,
        importantLevel: initialValues.importantLevel,
        countryID: initialValues.country?.id,
        accountRating: initialValues.accountRating,
        leadRating: initialValues.leadRating,
        deliveryRating: initialValues.deliveryRating,
        function: initialValues.function,
        ...values,
      })

      notification.success({
        message: "Project's client updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, "Could not update project's client"),
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
      title="Edit Project's Client"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item label="Client" name="clientID">
            <AsyncSelect
              swrKeys={GET_PATHS.getClients}
              optionGetter={async () => {
                const { data } = await client.getClients()
                return data?.map(transformClientDataToSelectOption) || []
              }}
              placeholder="Select client"
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
