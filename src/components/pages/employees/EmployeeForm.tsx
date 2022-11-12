import { Form, Row, Col, Input, Button, notification, Typography } from 'antd'
import { AsyncSelect } from 'components/common/Select'
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
            <AsyncSelect
              optionGetter={() => {
                const dataArray = Object.keys(EmployeeStatus).map((key) => {
                  return {
                    code: key,
                    name: EmployeeStatus[key as keyof typeof EmployeeStatus],
                  }
                })
                return new Promise((resolve) => {
                  setTimeout(() => resolve({ data: dataArray }), 5000)
                })
              }}
              value={
                EmployeeStatus[
                  defaultValues.status as keyof typeof EmployeeStatus
                ]
              }
            />
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
            <AsyncSelect
              optionGetter={() => {
                const dataArray = Object.keys(EmployeeRole).map((key) => {
                  return {
                    code: key,
                    name: EmployeeRole[key as keyof typeof EmployeeRole],
                  }
                })
                return new Promise((resolve) => {
                  setTimeout(() => resolve({ data: dataArray }), 5000)
                })
              }}
              value={
                EmployeeRole[defaultValues.status as keyof typeof EmployeeRole]
              }
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniority"
            rules={[{ required: true, message: 'Please select seniority' }]}
          >
            <AsyncSelect
              optionGetter={() => {
                const dataArray = Object.keys(EmployeeSeniority).map((key) => {
                  return {
                    code: key,
                    name: EmployeeSeniority[
                      key as keyof typeof EmployeeSeniority
                    ],
                  }
                })
                return new Promise((resolve) => {
                  setTimeout(() => resolve({ data: dataArray }), 5000)
                })
              }}
              value={
                EmployeeSeniority[
                  defaultValues.status as keyof typeof EmployeeSeniority
                ]
              }
            />
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
            <AsyncSelect
              optionGetter={() => {
                const dataArray = Object.keys(EmployeeAccountRole).map(
                  (key) => {
                    return {
                      code: key,
                      name: EmployeeAccountRole[
                        key as keyof typeof EmployeeAccountRole
                      ],
                    }
                  },
                )
                return new Promise((resolve) => {
                  setTimeout(() => resolve({ data: dataArray }), 5000)
                })
              }}
              value={
                EmployeeAccountRole[
                  defaultValues.status as keyof typeof EmployeeAccountRole
                ]
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
