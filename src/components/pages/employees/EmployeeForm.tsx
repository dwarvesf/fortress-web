import { Form, Row, Col, Input, Button, notification, Typography } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { ROUTES } from 'constants/routes'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { CreateEmployeeFormValues } from 'pages/employees/new'
import { useRef, useState, useEffect } from 'react'
import { theme } from 'styles'

interface Props {
  initialValues?: CreateEmployeeFormValues
  isEditing?: boolean
}

export const EmployeeForm = (props: Props) => {
  const { initialValues, isEditing = false } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { push } = useRouter()

  const [form] = Form.useForm()
  const createEmployeeFormRef = useRef({ ...new CreateEmployeeFormValues() })

  const onSubmit = async (values: Required<CreateEmployeeFormValues>) => {
    createEmployeeFormRef.current = transformDataToSend(values)
    console.log(createEmployeeFormRef.current)

    try {
      setIsSubmitting(true)

      // TODO: Bind create member & get select options APIs

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
              optionGetter={() => client.getMetaAccountStatuses()}
              swrKeys={GET_PATHS.getStatusSelectOptions}
              placeholder="Select status"
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
            label="Positions"
            name="positions"
            rules={[{ required: true, message: 'Please select positions' }]}
          >
            <AsyncSelect
              mode="multiple"
              optionGetter={() => client.getMetaPositions()}
              swrKeys={GET_PATHS.getPositionSelectOptions}
              placeholder="Select positions"
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
              optionGetter={() => client.getMetaSeniorities()}
              swrKeys={GET_PATHS.getSenioritySelectOptions}
              placeholder="Select seniority"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input salary' }]}
          >
            <Input type="number" placeholder="Enter salary" min={0} />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Account role"
            name="accountRole"
            rules={[{ required: true, message: 'Please select account role' }]}
          >
            <AsyncSelect
              optionGetter={() => client.getMetaAccountRoles()}
              swrKeys={GET_PATHS.getAccountRoleSelectOptions}
              placeholder="Select account role"
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
