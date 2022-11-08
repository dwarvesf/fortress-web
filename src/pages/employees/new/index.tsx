import { Button, Col, Form, notification, Row, Space, Typography } from 'antd'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { theme } from 'styles'
import { v4 as uuid4 } from 'uuid'
import { PageHeader } from 'components/common/PageHeader'
import { CreateEmployeeForm } from 'components/pages/employees/CreateEmployeeForm'

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

export class CreateEmployeeFormValues {
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
            onSubmit={onSubmit}
            isLoading={isSubmitting}
          />
        </Col>
      </Row>
    </Space>
  )
}

export default CreateEmployeePage
