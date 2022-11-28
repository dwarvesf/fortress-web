import { Form, Input, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { PkgHandlerProjectUpdateContactInfoInput } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { transformEmployeeDataToSelectOption } from 'utils/select'
import { useRouter } from 'next/router'

type ProjectContactInfoFormValues =
  Partial<PkgHandlerProjectUpdateContactInfoInput>

interface Props {
  isOpen: boolean
  initialValues: ProjectContactInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectContactInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const {
    query: { id: productId },
  } = useRouter()

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectContactInfoFormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateProjectContactInfo(productId as string, values)

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
      workingStatus: ['full-time'],
      preload: false,
    })
    return (data || []).map(transformEmployeeDataToSelectOption)
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
      title="Edit Project's Contact Info"
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
            name="accountManagerID"
            required
            rules={[{ required: true }]}
          >
            <AsyncSelect
              placeholder="Select project's account manager"
              swrKeys={[GET_PATHS.getEmployees, 'account-manager']}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={renderEmployeeOption}
            />
          </Form.Item>
          <Form.Item label="Delivery manager" name="deliveryManagerID">
            <AsyncSelect
              placeholder="Select project's delivery manager"
              swrKeys={[GET_PATHS.getEmployees, 'delivery-manager']}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={renderEmployeeOption}
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
