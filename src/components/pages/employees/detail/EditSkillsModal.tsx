import { Col, Form, Modal, notification, Row } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { GET_PATHS, client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PkgHandlerEmployeeUpdateSkillsInput } from 'types/schema'
import { transformMetadataToSelectOption } from 'utils/select'

interface Props {
  isOpen: boolean
  initialValues?: PkgHandlerEmployeeUpdateSkillsInput
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditSkillsModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const { query } = useRouter()

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (
    values: Required<PkgHandlerEmployeeUpdateSkillsInput>,
  ) => {
    try {
      setIsSubmitting(true)

      await client.updateEmployeeSkills(query.id as string, values)

      notification.success({
        message: "Employee's general info successfully updated!",
      })

      onClose()
      form.resetFields()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not update employee's general info!",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={(values) => {
          onSubmit(values)
        }}
        initialValues={initialValues}
      >
        <Row gutter={28}>
          <Col span={24}>
            <Form.Item label="Positions" name="positions">
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getPositionMetadata}
                placeholder="Select positions"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Chapter" name="chapter">
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getPositionMetadata}
                placeholder="Select chapter"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Seniority" name="seniority">
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getPositionMetadata}
                placeholder="Select seniority"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Tech stacks" name="stacks">
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getPositionMetadata}
                placeholder="Select tech stacks"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
