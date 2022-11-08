import { Form, Row, Col, Input, Select, Button } from 'antd'
import { FormInstance } from 'antd/lib/form'
import {
  EmployeeStatus,
  EmployeeRole,
  EmployeeSeniority,
  EmployeeAccountRole,
  CreateEmployeeFormValues,
} from 'pages/employees/new'
import { theme } from 'styles'

interface Props {
  form: FormInstance<CreateEmployeeFormValues>
  initialValues: CreateEmployeeFormValues
  onSubmit: (values: Required<CreateEmployeeFormValues>) => Promise<any>
  isLoading: boolean
}

export const CreateEmployeeForm = (props: Props) => {
  const { form, initialValues, onSubmit, isLoading } = props

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={(values) => {
        onSubmit(values as Required<CreateEmployeeFormValues>)
      }}
    >
      <Row gutter={28}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              { required: true, message: 'Please input fullname' },
              {
                max: 99,
                message: 'Fullname must be less than 100 characters',
              },
            ]}
          >
            <Input type="text" placeholder="Enter fullname" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select bordered={false} style={{ background: theme.colors.white }}>
              {Object.keys(EmployeeStatus).map((k) => (
                <Select.Option value={k} key={k}>
                  {EmployeeStatus[k as keyof typeof EmployeeStatus]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email' },
              { type: 'email', message: 'Wrong email format' },
            ]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Personal email"
            name="personalEmail"
            rules={[
              {
                required: true,
                message: 'Please input personal email',
              },
              { type: 'email', message: 'Wrong email format' },
            ]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select bordered={false} style={{ background: theme.colors.white }}>
              {Object.keys(EmployeeRole).map((k) => (
                <Select.Option value={k} key={k}>
                  {EmployeeRole[k as keyof typeof EmployeeRole]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniority"
            rules={[{ required: true, message: 'Please select seniority' }]}
          >
            <Select bordered={false} style={{ background: theme.colors.white }}>
              {Object.keys(EmployeeSeniority).map((k) => (
                <Select.Option value={k} key={k}>
                  {EmployeeSeniority[k as keyof typeof EmployeeSeniority]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input salary' }]}
          >
            <Input type="number" placeholder="Enter salary" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Account role"
            name="accountRole"
            rules={[{ required: true, message: 'Please select account role' }]}
          >
            <Select bordered={false} style={{ background: theme.colors.white }}>
              {Object.keys(EmployeeAccountRole).map((k) => (
                <Select.Option value={k} key={k}>
                  {EmployeeAccountRole[k as keyof typeof EmployeeAccountRole]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  )
}
