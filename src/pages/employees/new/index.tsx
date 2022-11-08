import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from 'styles'
import { v4 as uuid4 } from 'uuid'
import { PageHeader } from 'components/common/PageHeader'

const CreateEmployeeForm = styled(Form)`
  .ant-form-item-row {
    flex-direction: column;
    align-items: start;
  }

  .ant-form-item-control {
    width: 100%;
  }

  .ant-form-item-label {
    font-weight: 600;
  }

  .ant-form-item-required::after {
    content: '*';
    color: ${theme.colors.primary};
  }

  .ant-form-item-required::before {
    display: none !important;
  }

  .ant-input-status-error {
    background-color: ${theme.colors.white} !important;
  }

  input {
    background-color: ${theme.colors.white};
  }
`

export const EmployeeStatus = {
  onboarding: 'Onboarding',
  probation: 'Probation',
  active: 'Active',
  leave: 'On leave',
}

export const EmployeeRole = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  blockchain: 'Blockchain',
  projectManager: 'Project manager',
}

export const EmployeeSeniority = {
  fresher: 'Fresher',
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
  staff: 'Staff',
  principle: 'Principle',
}

export const EmployeeAccountRole = {
  admin: 'Admin',
  member: 'Member',
}

class CreateEmployeeFormValues {
  id?: string
  fullname?: string
  status?: keyof typeof EmployeeStatus
  email?: string
  personalEmail?: string
  role?: keyof typeof EmployeeRole
  seniority?: keyof typeof EmployeeSeniority
  salary?: number
  accountRole?: keyof typeof EmployeeAccountRole

  constructor() {
    this.id = uuid4()
  }
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

interface Props {
  initialValues?: CreateEmployeeFormValues
}

const CreateEmployeePage = (props: Props) => {
  const { initialValues = defaultValues } = props
  const [form] = Form.useForm()
  const createEmployeeFormRef = useRef({ ...new CreateEmployeeFormValues() })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { push } = useRouter()

  const onSubmit = async (values: Required<CreateEmployeeFormValues>) => {
    createEmployeeFormRef.current = transformDataToSend(values)
    try {
      setIsSubmitting(true)

      // TODO: Bind API

      notification.success({
        message: 'Success',
        description: `Successfully created new employee!`,
        btn: (
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
        ),
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
        description: error?.message || 'Could not create new employee!',
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
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader title="New employee" />
      <Row>
        <Col span={24} lg={{ span: 16 }}>
          <CreateEmployeeForm
            form={form}
            initialValues={initialValues}
            onFinish={(values) => {
              onSubmit(values as Required<CreateEmployeeFormValues>)
            }}
          >
            <Row gutter={32}>
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
                  <Select
                    bordered={false}
                    style={{ background: theme.colors.white }}
                  >
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
                  <Select
                    bordered={false}
                    style={{ background: theme.colors.white }}
                  >
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
                  rules={[
                    { required: true, message: 'Please select seniority' },
                  ]}
                >
                  <Select
                    bordered={false}
                    style={{ background: theme.colors.white }}
                  >
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
                  rules={[
                    { required: true, message: 'Please select account role' },
                  ]}
                >
                  <Select
                    bordered={false}
                    style={{ background: theme.colors.white }}
                  >
                    {Object.keys(EmployeeAccountRole).map((k) => (
                      <Select.Option value={k} key={k}>
                        {
                          EmployeeAccountRole[
                            k as keyof typeof EmployeeAccountRole
                          ]
                        }
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
          </CreateEmployeeForm>
        </Col>
      </Row>
    </Space>
  )
}

export default CreateEmployeePage
