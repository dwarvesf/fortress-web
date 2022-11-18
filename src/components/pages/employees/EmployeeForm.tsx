import {
  Form,
  Row,
  Col,
  Input,
  Button,
  notification,
  Typography,
  Tag,
  Select,
} from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import { employeeStatuses } from 'constants/status'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { CreateEmployeeFormValues } from 'pages/employees/new'
import { useRef, useState, useEffect } from 'react'
import { theme } from 'styles'
import { PkgHandlerEmployeeCreateEmployeeInput } from 'types/schema'

const { Option } = Select

interface Props {
  initialValues?: CreateEmployeeFormValues
  isEditing?: boolean
}

const customOptionRenderer = (metaItem: { id?: string; name?: string }) => (
  <Option key={metaItem.id} value={metaItem.id} label={metaItem.name}>
    <Tag color={statusColors[metaItem.id!]}>{metaItem.name || '-'}</Tag>
  </Option>
)

export const EmployeeForm = (props: Props) => {
  const { initialValues, isEditing = false } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [salaryValue, setSalaryValue] = useState<number>() // since form data always output string values

  const { push } = useRouter()

  const [form] = Form.useForm()
  const createEmployeeFormRef = useRef({ ...new CreateEmployeeFormValues() })

  const onCreateSubmit = async (
    values: Required<PkgHandlerEmployeeCreateEmployeeInput>,
  ) => {
    createEmployeeFormRef.current = transformDataToSend(values)

    // Schedule to redirect to employee list page
    // Clear timer in case clicking on employee detail button or catching error
    const redirectTimer = setTimeout(() => push(ROUTES.EMPLOYEES), 5000)

    try {
      setIsSubmitting(true)

      const { data } = await client.createNewEmployee(
        createEmployeeFormRef.current as PkgHandlerEmployeeCreateEmployeeInput,
      )

      notification.success({
        message: 'Success',
        description: 'Successfully created new employee!',
        btn: (
          <Button
            style={{ backgroundColor: theme.colors.primary }}
            onClick={() => {
              clearTimeout(redirectTimer)
              push(ROUTES.EMPLOYEE_DETAIL(data.id!))
            }}
          >
            <Typography.Text
              style={{ fontWeight: 500, color: theme.colors.white }}
            >
              View employee detail
            </Typography.Text>
          </Button>
        ),
        duration: 5,
      })
    } catch (error: any) {
      clearTimeout(redirectTimer)

      notification.error({
        message: 'Error',
        description: error?.message || 'Could not create new employee!',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // TODO: const onEditSubmit

  const transformDataToSend = (
    values: Required<PkgHandlerEmployeeCreateEmployeeInput>,
  ) => {
    return {
      fullName: values.fullName,
      displayName: values.displayName,
      personalEmail: values.personalEmail,
      positions: values.positions,
      roleID: values.roleID,
      salary: salaryValue,
      seniorityID: values.seniorityID,
      status: values.status,
      teamEmail: values.teamEmail,
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
        if (!isEditing) {
          onCreateSubmit(
            values as Required<PkgHandlerEmployeeCreateEmployeeInput>,
          )
        }
      }}
    >
      <Row gutter={28}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              { required: true, message: 'Please input full name' },
              {
                max: 99,
                message: 'Full name must be less than 100 characters',
              },
            ]}
          >
            <Input type="text" placeholder="Enter full name" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Display name"
            name="displayName"
            rules={[
              { required: true, message: 'Please input display name' },
              {
                max: 99,
                message: 'Display name must be less than 100 characters',
              },
            ]}
          >
            <Input type="text" placeholder="Enter display name" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <AsyncSelect
              optionGetter={() =>
                Promise.resolve({
                  data: Object.keys(employeeStatuses).map((key) => ({
                    id: key,
                    name: employeeStatuses[
                      key as keyof typeof employeeStatuses
                    ],
                  })),
                })
              }
              swrKeys={GET_PATHS.getAccountStatusMetadata}
              placeholder="Select status"
              customOptionRenderer={customOptionRenderer}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Team email"
            name="teamEmail"
            rules={[
              { required: true, message: 'Please input team email' },
              { type: 'email', message: 'Wrong email format' },
            ]}
          >
            <Input type="email" placeholder="Enter team email" />
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
              swrKeys={GET_PATHS.getPositionMetadata}
              placeholder="Select positions"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniorityID"
            rules={[{ required: true, message: 'Please select seniority' }]}
          >
            <AsyncSelect
              optionGetter={() => client.getMetaSeniorities()}
              swrKeys={GET_PATHS.getSeniorityMetadata}
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
            <Input
              type="number"
              placeholder="Enter salary"
              min={0}
              onChange={(e) => {
                setSalaryValue(parseFloat(e.target.value))
              }}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Account role"
            name="roleID"
            rules={[{ required: true, message: 'Please select account role' }]}
          >
            <AsyncSelect
              optionGetter={() => client.getMetaAccountRoles()}
              swrKeys={GET_PATHS.getAccountRoleMetadata}
              placeholder="Select account role"
            />
          </Form.Item>
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        style={{ marginTop: 16 }}
      >
        Submit
      </Button>
    </Form>
  )
}
