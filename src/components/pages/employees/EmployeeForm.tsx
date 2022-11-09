import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  notification,
  Typography,
} from 'antd'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import {
  EmployeeStatus,
  EmployeeRole,
  EmployeeSeniority,
  EmployeeAccountRole,
  CreateEmployeeFormValues,
} from 'pages/employees/new'
import { useRef, useState, useEffect } from 'react'
import { theme } from 'styles'

interface Props {
  initialValues?: CreateEmployeeFormValues
  isEditing?: boolean
}

const defaultValues: CreateEmployeeFormValues = {
  fullname: undefined,
  status: 'onboarding',
  email: undefined,
  personalEmail: undefined,
  role: 'frontend',
  seniority: 'fresher',
  salary: undefined,
  accountRole: 'admin',
}

export const EmployeeForm = (props: Props) => {
  const { initialValues = defaultValues, isEditing = false } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { push } = useRouter()

  const [form] = Form.useForm()
  const createEmployeeFormRef = useRef({ ...new CreateEmployeeFormValues() })

  const onSubmit = async (values: Required<CreateEmployeeFormValues>) => {
    createEmployeeFormRef.current = transformDataToSend(values)
    try {
      setIsSubmitting(true)

      // TODO: Bind API

      notification.success({
        message: 'Success',
        description: isEditing
          ? 'Successfully edited employee!'
          : 'Successfully created new employee!',
        btn: !isEditing ? (
          <Button
            style={{ backgroundColor: theme.colors.white, borderRadius: 5 }}
            onClick={() => {
              push(ROUTES.EMPLOYEE_DETAIL(createEmployeeFormRef?.current?.id!))
            }}
          >
            <Typography.Text
              style={{ fontWeight: 500, color: theme.colors.primary }}
            >
              View employee detail
            </Typography.Text>
          </Button>
        ) : null,
        duration: 5,
      })

      // Automatically route to employees list page, should schedule this after the fetch data hook
      return await new Promise(() => {
        setIsSubmitting(false)
        setTimeout(() => push(ROUTES.EMPLOYEES), 5000)
      })
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description:
          error?.message ||
          (isEditing
            ? 'Could not edit employee!'
            : 'Could not create new employee!'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (values: Required<CreateEmployeeFormValues>) => {
    return {
      ...createEmployeeFormRef.current,
      ...values,
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues]) // eslint-disable-line

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
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
