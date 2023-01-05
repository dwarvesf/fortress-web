import { Form, Input, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { RequestUpdateContactInfoInput } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { transformEmployeeDataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'
import { fullListPagination } from 'types/filters/Pagination'
import { FormInputList } from 'components/common/FormInputList'

type ProjectContactInfoFormValues = Partial<RequestUpdateContactInfoInput>

interface Props {
  projectID: string
  isOpen: boolean
  initialValues: ProjectContactInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectContactInfoModal = (props: Props) => {
  const { projectID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectContactInfoFormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateProjectContactInfo(projectID, values)

      notification.success({
        message: "Project's contact info updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update project's contact info",
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const employeeOptionGetter = async () => {
    const { data } = await client.getEmployees({
      ...fullListPagination,
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
          <FormInputList
            form={form}
            name="clientEmail"
            label="Client email"
            rules={[
              { type: 'email', message: 'Wrong email format' },
              { required: true, message: 'Required' },
            ]}
            addButtonProps={{ children: 'Add email' }}
          >
            <Input className="bordered" placeholder="Enter client email" />
          </FormInputList>
          <Form.Item
            label="Project Email"
            name="projectEmail"
            rules={[
              { type: 'email', message: 'Wrong email format' },
              { required: true, message: 'Required' },
            ]}
          >
            <Input placeholder="Enter project email" className="bordered" />
          </Form.Item>
          <Form.Item
            label="Account Manager"
            name="accountManagerID"
            required
            rules={[{ required: true, message: 'Wrong email format' }]}
          >
            <AsyncSelect
              placeholder="Select project's account manager"
              swrKeys={GET_PATHS.getEmployees}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={renderEmployeeOption}
            />
          </Form.Item>
          <Form.Item label="Delivery Manager" name="deliveryManagerID">
            <AsyncSelect
              placeholder="Select project's delivery manager"
              swrKeys={GET_PATHS.getEmployees}
              optionGetter={employeeOptionGetter}
              customOptionRenderer={renderEmployeeOption}
              allowClear
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
