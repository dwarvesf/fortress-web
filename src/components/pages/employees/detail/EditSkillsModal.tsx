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
        message: "Employee's skills successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not update employee's skills!",
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
      title="Edit skills"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Positions"
              name="positions"
              rules={[{ required: true, message: 'Please select positions' }]}
            >
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getPositionMetadata, 'edit-skills']}
                placeholder="Select positions"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Chapter" name="chapter">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getChaptersMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getChapterMetadata, 'edit-skills']}
                placeholder="Select chapter"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Seniority"
              name="seniority"
              rules={[{ required: true, message: 'Please select seniority' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getSenioritiesMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getSeniorityMetadata, 'edit-skills']}
                placeholder="Select seniority"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Tech stack"
              name="stacks"
              rules={[{ required: true, message: 'Please select stack' }]}
            >
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getStackMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getStackMetadata, 'edit-skills']}
                placeholder="Select tech stack"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}