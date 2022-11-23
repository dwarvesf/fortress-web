import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  notification,
  Space,
} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import { PageHeader } from 'components/common/PageHeader'
import {
  CREATE_PROJECT_DATE_FORMAT,
  SELECT_BOX_DATE_FORMAT,
} from 'constants/date'
import { projectTypes } from 'constants/projectTypes'
import { ROUTES } from 'constants/routes'
import { GET_PATHS, client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { theme } from 'styles'
import { PkgHandlerProjectCreateProjectInput } from 'types/schema'
import { transformMetadataToSelectOption } from 'utils/select'

const CreateNewProjectPage = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { push } = useRouter()

  const onSubmit = async (
    values: Required<PkgHandlerProjectCreateProjectInput>,
  ) => {
    try {
      setIsSubmitting(true)

      await client.createNewProject(transformDataToSend(values))

      notification.success({
        message: 'New project successfully created!',
      })

      // Redirect to project list page if create successfully
      setTimeout(() => push(ROUTES.PROJECTS))
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not create new project!',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): PkgHandlerProjectCreateProjectInput => {
    return {
      accountManagerID: values.accountManagerID,
      clientEmail: values.clientEmail,
      countryID: values.countryID,
      deliveryManagerID: values.deliveryManagerID || '',
      members: [],
      name: values.name,
      projectEmail: values.projectEmail,
      startDate: values.startDate
        ? String(values.startDate.format(CREATE_PROJECT_DATE_FORMAT))
        : '',
      status: values.status,
      type: values.type,
    }
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader title="New project" />
      <Row>
        <Col span={24} lg={{ span: 16 }}>
          <Form
            form={form}
            onFinish={(values) => {
              onSubmit(values as Required<PkgHandlerProjectCreateProjectInput>)
            }}
          >
            <Row gutter={24}>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Project name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input project name' },
                    {
                      max: 99,
                      message: 'Display name must be less than 100 characters',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter project name" />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <AsyncSelect
                    bordered={false}
                    optionGetter={async () => {
                      const { data } = await client.getProjectStatusMetadata()
                      return data.map(transformMetadataToSelectOption)
                    }}
                    swrKeys={[
                      GET_PATHS.getProjectStatusMetadata,
                      'create-new-project',
                    ]}
                    placeholder="Select project status"
                    customOptionRenderer={renderStatusOption}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Account manager"
                  name="accountManagerID"
                  rules={[
                    {
                      required: true,
                      message: 'Please select account manager',
                    },
                  ]}
                >
                  <AsyncSelect
                    bordered={false}
                    optionGetter={async () => {
                      const { data } = await client.getEmployees({
                        page: 1,
                        size: 1000,
                        // workingStatus: ['contractor'],
                        preload: false,
                      })
                      return (
                        data?.map(
                          (metaItem: {
                            id?: string
                            displayName?: string
                            avatar?: string
                          }) => {
                            return {
                              value: metaItem.id,
                              label: {
                                id: metaItem.id,
                                displayName: metaItem.displayName,
                                avatar: metaItem.avatar,
                              },
                            }
                          },
                        ) || []
                      )
                    }}
                    swrKeys={[
                      GET_PATHS.getEmployees,
                      'create-new-project',
                      'account-manager',
                    ]}
                    placeholder="Select account manager"
                    customOptionRenderer={renderEmployeeOption}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Country"
                  name="countryID"
                  rules={[{ required: true, message: 'Please select country' }]}
                >
                  <AsyncSelect
                    bordered={false}
                    optionGetter={async () => {
                      const { data } = await client.getCountryMetadata()
                      return data.map(transformMetadataToSelectOption)
                    }}
                    swrKeys={[
                      GET_PATHS.getCountryMetadata,
                      'create-new-project',
                    ]}
                    placeholder="Select project country"
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Delivery manager" name="deliveryManagerID">
                  <AsyncSelect
                    bordered={false}
                    optionGetter={async () => {
                      const { data } = await client.getEmployees({
                        page: 1,
                        size: 1000,
                        preload: false,
                      })
                      return (
                        data?.map(
                          (metaItem: {
                            id?: string
                            displayName?: string
                            avatar?: string
                          }) => {
                            return {
                              value: metaItem.id,
                              label: {
                                id: metaItem.id,
                                displayName: metaItem.displayName,
                                avatar: metaItem.avatar,
                              },
                            }
                          },
                        ) || []
                      )
                    }}
                    swrKeys={[
                      GET_PATHS.getEmployees,
                      'create-new-project',
                      'delivery-manager',
                    ]}
                    placeholder="Select delivery manager"
                    customOptionRenderer={renderEmployeeOption}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Start date" name="startDate">
                  <DatePicker
                    className="bg-white"
                    format={SELECT_BOX_DATE_FORMAT}
                    style={{ width: '100%', borderColor: theme.colors.white }}
                    placeholder="Select start date"
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Project email"
                  name="projectEmail"
                  rules={[
                    { required: true, message: 'Please input project email' },
                    { type: 'email', message: 'Wrong email format' },
                  ]}
                >
                  <Input type="email" placeholder="Enter project email" />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Client email"
                  name="clientEmail"
                  rules={[
                    { required: true, message: 'Please input client email' },
                    { type: 'email', message: 'Wrong email format' },
                  ]}
                >
                  <Input type="email" placeholder="Enter client email" />
                </Form.Item>
              </Col>

              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select type' }]}
                >
                  <AsyncSelect
                    bordered={false}
                    optionGetter={() =>
                      Promise.resolve(
                        Object.keys(projectTypes).map((key) => ({
                          value: key,
                          label: projectTypes[key as keyof typeof projectTypes],
                        })),
                      )
                    }
                    swrKeys={GET_PATHS.getAccountStatusMetadata}
                    placeholder="Select type"
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
        </Col>
      </Row>
    </Space>
  )
}

export default CreateNewProjectPage
