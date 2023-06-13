import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { RequestUpdateProjectGeneralInfoInput } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import { transformMetadataToSelectOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'
import {
  ProjectFunction,
  projectFunctions,
  ProjectImportance,
  projectImportances,
} from 'constants/project'
import { SELECT_BOX_DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'

type ProjectGeneralInfoFormValues = Partial<
  Omit<RequestUpdateProjectGeneralInfoInput, 'startDate'>
> & { startDate?: moment.Moment }

interface Props {
  projectID: string
  isOpen: boolean
  initialValues: ProjectGeneralInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProjectGeneralInfoModal = (props: Props) => {
  const { projectID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ProjectGeneralInfoFormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateProjectGeneralInfo(projectID, {
        ...values,
        startDate: values.startDate?.format(SERVER_DATE_FORMAT),
      } as RequestUpdateProjectGeneralInfoInput)

      notification.success({
        message: "Project's general info updated successfully!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update project's general info",
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Edit Project's General Info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Enter project's name" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Start Date" name="startDate">
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select project's start date"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Country"
              name="countryID"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                placeholder="Select project's country"
                swrKeys={GET_PATHS.getCountryMetadata}
                optionGetter={async () => {
                  const { data } = await client.getCountryMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Stacks" name="stacks">
              <AsyncSelect
                mode="multiple"
                placeholder="Select project's stacks"
                swrKeys={GET_PATHS.getStackMetadata}
                optionGetter={async () =>
                  ((await client.getStackMetadata()).data || []).map(
                    transformMetadataToSelectOption,
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Function"
              name="function"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                placeholder="Select project's function"
                options={Object.keys(projectFunctions).map((key) => {
                  return {
                    label: projectFunctions[key as ProjectFunction],
                    value: key,
                  }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Notion ID" name="auditNotionID">
              <Input placeholder="Input Notion ID" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Important"
              name="importantLevel"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                placeholder="Select project's important level"
                options={Object.keys(projectImportances).map((key) => {
                  return {
                    label: projectImportances[key as ProjectImportance],
                    value: key,
                  }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Lead Rating"
              name="leadRating"
              rules={[
                { required: true, message: 'Required' },
                {
                  type: 'number',
                  min: 1,
                  max: 5,
                  message: 'Select value from 1 to 5',
                },
              ]}
            >
              <Select
                placeholder="Select project's lead rating"
                options={[1, 2, 3, 4, 5].map((key) => {
                  return {
                    label: key,
                    value: key,
                  }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Account Rating"
              name="accountRating"
              rules={[
                { required: true, message: 'Required' },
                {
                  type: 'number',
                  min: 1,
                  max: 5,
                  message: 'Select value from 1 to 5',
                },
              ]}
            >
              <Select
                placeholder="Select project's account rating"
                options={[1, 2, 3, 4, 5].map((key) => {
                  return {
                    label: key,
                    value: key,
                  }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Delivery Rating"
              name="deliveryRating"
              rules={[
                { required: true, message: 'Required' },
                {
                  type: 'number',
                  min: 1,
                  max: 5,
                  message: 'Select value from 1 to 5',
                },
              ]}
            >
              <Select
                placeholder="Select project's delivery rating"
                options={[1, 2, 3, 4, 5].map((key) => {
                  return {
                    label: key,
                    value: key,
                  }
                })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
