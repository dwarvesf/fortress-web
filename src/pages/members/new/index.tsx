import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from 'antd'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from 'styles'
import { v4 as uuid4 } from 'uuid'

const Heading = styled(Typography.Text)`
  color: ${theme.colors.gray700};
  font-weight: 600;
  font-size: 20px;
`

const CreateMemberForm = styled(Form)`
  .ant-form-item-row {
    flex-direction: column;
    align-items: start;
  }

  .ant-form-item-control {
    width: 100%;
  }

  input {
    background-color: ${theme.colors.white};
  }
`
const PrimaryButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: 500;
  border-radius: 4px;
`

export const MemberStatus = {
  onboarding: 'Onboarding',
  probation: 'Probation',
  active: 'Active',
  leave: 'On leave',
}

export const MemberRole = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  blockchain: 'Blockchain',
  projectManager: 'Project manager',
}

export const MemberSeniority = {
  fresher: 'Fresher',
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
  staff: 'Staff',
  principle: 'Principle',
}

export const MemberAccountRole = {
  admin: 'Admin',
  member: 'Member',
}

class CreateMemberFormValues {
  id?: string
  fullname?: string
  status?: keyof typeof MemberStatus
  email?: string
  personalEmail?: string
  role?: keyof typeof MemberRole
  seniority?: keyof typeof MemberSeniority
  salary?: number
  accountRole?: keyof typeof MemberAccountRole

  constructor() {
    this.id = uuid4()
  }
}

const defaultValues: CreateMemberFormValues = {
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
  initialValues?: CreateMemberFormValues
}

const CreateMemberPage = (props: Props) => {
  const { initialValues = defaultValues } = props
  const [form] = Form.useForm()
  const createMemberFormRef = useRef({ ...new CreateMemberFormValues() })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { push } = useRouter()

  const onSubmit = async (values: Required<CreateMemberFormValues>) => {
    createMemberFormRef.current = transformDataToSend(values)
    try {
      setIsSubmitting(true)

      // TODO: Bind API

      notification.success({
        message: 'Success',
        description: `Successfully created new member!`,
        btn: (
          <Button
            style={{ backgroundColor: theme.colors.white, borderRadius: 5 }}
            onClick={() => {
              push(ROUTES.MEMBER_DETAIL(createMemberFormRef?.current?.id!))
            }}
          >
            <Typography.Text type="success" style={{ fontWeight: 500 }}>
              View member detail
            </Typography.Text>
          </Button>
        ),
        duration: 5,
      })

      // Automatically route to members list page, should schedule this after the fetch data hook
      return await new Promise(() => {
        setTimeout(() => push(ROUTES.MEMBERS), 5000)
      })
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.message || 'Could not create new member!',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (values: Required<CreateMemberFormValues>) => {
    return {
      ...createMemberFormRef.current,
      ...values,
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues]) // eslint-disable-line

  return (
    <Row>
      <Col span={24} lg={{ span: 16 }}>
        <CreateMemberForm
          form={form}
          initialValues={initialValues}
          onFinish={(values) => {
            onSubmit(values as Required<CreateMemberFormValues>)
          }}
        >
          <Heading as="h2">New member</Heading>
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
                  {Object.keys(MemberStatus).map((k) => (
                    <Select.Option value={k} key={k}>
                      {MemberStatus[k as keyof typeof MemberStatus]}
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
                  {Object.keys(MemberRole).map((k) => (
                    <Select.Option value={k} key={k}>
                      {MemberRole[k as keyof typeof MemberRole]}
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
                <Select
                  bordered={false}
                  style={{ background: theme.colors.white }}
                >
                  {Object.keys(MemberSeniority).map((k) => (
                    <Select.Option value={k} key={k}>
                      {MemberSeniority[k as keyof typeof MemberSeniority]}
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
                  {Object.keys(MemberAccountRole).map((k) => (
                    <Select.Option value={k} key={k}>
                      {MemberAccountRole[k as keyof typeof MemberAccountRole]}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <PrimaryButton htmlType="submit" loading={isSubmitting}>
            Submit
          </PrimaryButton>
        </CreateMemberForm>
      </Col>
    </Row>
  )
}

export default CreateMemberPage
