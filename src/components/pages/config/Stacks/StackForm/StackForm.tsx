import { Form, FormInstance, Input } from 'antd'
import { RequestCreateStackInput } from 'types/schema'

interface Props {
  form: FormInstance<any>
  initialValues?: RequestCreateStackInput
  onSubmit: (values: RequestCreateStackInput) => void
}

export const StackForm = (props: Props) => {
  const { form, initialValues, onSubmit } = props

  return (
    <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter stack's name" className="bordered" />
      </Form.Item>
      <Form.Item
        label="Code"
        name="code"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter stack's code" className="bordered" />
      </Form.Item>
    </Form>
  )
}
