import { Form, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { transformBankAccountDataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'

// TODO: Types
type ProjectBankAccountFormValues = Partial<any>

interface Props {
  projectID: string
  isOpen: boolean
  initialValues: ProjectBankAccountFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectBankAccountModal = (props: Props) => {
  const { projectID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectBankAccountFormValues) => {
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
        message: "Project's bank account updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update project's bank account",
        ),
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
      title="Edit Project's Bank Account"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item label="Bank Account" name="bankAccountID">
            <AsyncSelect
              swrKeys={GET_PATHS.getBankAccounts}
              optionGetter={async () => {
                const { data } = await client.getBankAccounts()
                return data?.map(transformBankAccountDataToSelectOption) || []
              }}
              placeholder="Select bank account"
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
