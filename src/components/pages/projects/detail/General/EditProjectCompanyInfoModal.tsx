import { Form, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { transformCompanyInfoDataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'

// TODO: Types
type ProjectCompanyInfoFormValues = Partial<any>

interface Props {
  projectID: string
  isOpen: boolean
  initialValues: ProjectCompanyInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectCompanyInfoModal = (props: Props) => {
  const { projectID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectCompanyInfoFormValues) => {
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
        message: "Project's company info updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update project's company info",
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
      title="Edit Project's Company Info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item label="Company Info" name="companyInfoID">
            <AsyncSelect
              swrKeys={GET_PATHS.getCompanyInfos}
              optionGetter={async () => {
                const { data } = await client.getCompanyInfos()
                return data?.map(transformCompanyInfoDataToSelectOption) || []
              }}
              placeholder="Select company info"
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
