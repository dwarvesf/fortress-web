import { useAsyncEffect } from '@dwarvesf/react-hooks'
import { Col, Form, Input, Modal, notification, Row, Select } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { GET_PATHS, client } from 'libs/apis'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { PkgHandlerEmployeeUpdateGeneralInfoInput } from 'types/schema'

const { Option } = Select

interface Props {
  isOpen: boolean
  initialValues?: PkgHandlerEmployeeUpdateGeneralInfoInput
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditGeneralInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const { query } = useRouter()

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (
    values: Required<PkgHandlerEmployeeUpdateGeneralInfoInput>,
  ) => {
    try {
      setIsSubmitting(true)
      await client.updateEmployeeGeneralInfo(query.id as string, values)

      notification.success({
        message: "Employee's general info successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not update employee's general info!",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  let defaultLineManager: ReactNode

  useAsyncEffect(async () => {
    if (initialValues?.lineManagerID) {
      const { data } = await client.getEmployee(initialValues.lineManagerID)
      defaultLineManager = (
        <Option key={data.id} value={data.id} label={data.fullName}>
          <AvatarWithName
            isLink={false}
            user={{
              fullName: data.fullName,
              id: data.id,
              displayName: data.displayName,
              avatar: data.avatar,
            }}
          />
        </Option>
      )
    }
  }, [])

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Edit General Info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
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
              <Input
                className="bordered"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team email"
              name="email"
              rules={[
                { required: true, message: 'Please input team email' },
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
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input phone number',
                },
                {
                  min: 10,
                  message: 'Phone number must be longer than 9 numbers',
                },
                {
                  max: 12,
                  message: 'Phone number must be shorter than 13 numbers',
                },
                {
                  pattern: /^\d+$/,
                  message: 'Phone number must contains only digits',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter phone number"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Line manager" name="lineManagerID">
              <AsyncSelect
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
                swrKeys={[GET_PATHS.getEmployees, 'line-manager']}
                placeholder="Select line manager"
                customOptionRenderer={renderEmployeeOption}
                value={defaultLineManager}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Discord ID"
              name="discordID"
              rules={[
                {
                  pattern: /^.{3,32}#[0-9]{4}$/,
                  message: 'Please input accurate Discord ID',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter Discord ID"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="GitHub ID" name="githubID">
              <Input
                className="bordered"
                type="text"
                placeholder="Enter GitHub ID"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Notion ID" name="notionID">
              <Input
                className="bordered"
                type="text"
                placeholder="Enter Notion ID"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
