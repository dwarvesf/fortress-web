import { Form, Row, Col, Input, Button, notification, Select } from 'antd'
import { FormWrapper } from 'components/common/FormWrapper'
import { AsyncSelect } from 'components/common/Select'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import { ROUTES } from 'constants/routes'
import { employeeStatuses } from 'constants/status'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { CreateEmployeeFormValues } from 'pages/employees/new'
import { useState, useEffect } from 'react'
import { theme } from 'styles'
import { RequestCreateEmployeeInput } from 'types/schema'
import {
  searchFilterOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { getErrorMessage } from 'utils/string'

interface Props {
  initialValues?: CreateEmployeeFormValues
  isEditing?: boolean
}

export const EmployeeForm = (props: Props) => {
  const { initialValues, isEditing = false } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { push } = useRouter()

  const [form] = Form.useForm()

  const onCreateSubmit = async (
    values: Required<RequestCreateEmployeeInput>,
  ) => {
    try {
      setIsSubmitting(true)

      const { data } = await client.createNewEmployee(
        transformDataToSend(values),
      )

      notification.success({
        message: 'New employee successfully created!',
        btn: (
          <Button
            type="primary"
            onClick={() => {
              push(ROUTES.EMPLOYEE_DETAIL(data.id!))
            }}
          >
            View employee detail
          </Button>
        ),
        duration: 5,
      })

      // Redirect to employee list page if create successfully
      setTimeout(() => push(ROUTES.EMPLOYEES))
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not create new employee'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // TODO: const onEditSubmit

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): RequestCreateEmployeeInput => {
    return {
      fullName: values.fullName,
      displayName: values.displayName,
      personalEmail: values.personalEmail,
      positions: values.positions,
      roleID: values.roleID,
      salary: parseFloat(values.salary),
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
    <FormWrapper
      footer={
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          onClick={form.submit}
        >
          Submit
        </Button>
      }
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={(values) => {
          if (!isEditing) {
            onCreateSubmit(values as Required<RequestCreateEmployeeInput>)
          }
        }}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Full name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Display name"
              name="displayName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Display name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter display name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                style={{ background: theme.colors.white }}
                placeholder="Select status"
                showSearch
                showArrow
                filterOption={searchFilterOption}
                maxTagCount="responsive"
              >
                {Object.keys(employeeStatuses)
                  .map((key) => ({
                    value: key,
                    label:
                      employeeStatuses[key as keyof typeof employeeStatuses],
                  }))
                  .map(renderStatusOption)}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team email"
              name="teamEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter team email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Personal email"
              name="personalEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Positions"
              name="positions"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getPositionMetadata]}
                placeholder="Select positions"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Seniority"
              name="seniorityID"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getSenioritiesMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getSeniorityMetadata]}
                placeholder="Select seniority"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                className="bordered"
                type="number"
                placeholder="Enter salary"
                min={0}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Account role"
              name="roleID"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getAccountRolesMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getAccountRoleMetadata}
                placeholder="Select account role"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </FormWrapper>
  )
}
