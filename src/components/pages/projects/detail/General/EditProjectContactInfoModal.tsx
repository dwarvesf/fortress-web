import { Form, Input, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { FormAccountWithRateList } from 'components/common/FormAccountWithRateList'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestUpdateContactInfoInput } from 'types/schema'
import { getErrorMessage } from 'utils/string'

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

      const formattedValues: RequestUpdateContactInfoInput = {
        ...values,
        salePersons: values.salePersons?.filter((each) => !!each.employeeID),
      }
      await client.updateProjectContactInfo(projectID, formattedValues)

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
          {/* <FormInputList
            form={form}
            name="clientEmail"
            label="Client Email"
            rules={[
              { type: 'email', message: 'Wrong email format' },
              { required: true, message: 'Required' },
            ]}
            addButtonProps={{ children: 'Add email' }}
            inputProps={{ type: 'email', placeholder: 'Enter client email' }}
          /> */}
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
          <FormAccountWithRateList
            form={form}
            name="accountManagers"
            label="Account Managers"
            selectProps={{ placeholder: "Select project's account manager" }}
          />
          <FormAccountWithRateList
            form={form}
            name="deliveryManagers"
            label="Delivery Managers"
            selectProps={{ placeholder: "Select project's delivery manager" }}
          />
          <FormAccountWithRateList
            form={form}
            name="salePersons"
            label="Sale Persons"
            selectProps={{ placeholder: "Select project's sale person" }}
          />
        </Space>
      </Form>
    </Modal>
  )
}
