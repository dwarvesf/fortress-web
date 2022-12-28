import { Col, Form, Modal, notification, Row, Select } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { theme } from 'styles'
import { RequestUpdateSkillsInput } from 'types/schema'
import {
  searchFilterOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { getErrorMessage } from 'utils/string'

interface Props {
  isOpen: boolean
  initialValues?: RequestUpdateSkillsInput
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditSkillsModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props
  const { query } = useRouter()

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedChapters, setSelectedChapters] = useState<string[]>(
    initialValues?.chapters || [],
  )

  const { data } = useFetchWithCache(
    [GET_PATHS.getChapterMetadata, 'chapter-lead', 'edit-skills'],
    () => client.getChaptersMetadata(),
  )

  const onSubmit = async (values: Required<RequestUpdateSkillsInput>) => {
    try {
      if (
        !(
          values.leadingChapters &&
          values.leadingChapters.every((l) => selectedChapters.includes(l))
        ) &&
        values.leadingChapters !== []
      ) {
        notification.error({
          message: 'Leading chapters must be chosen from selected chapters!',
        })
      } else {
        setIsSubmitting(true)

        await client.updateEmployeeSkills(query.id as string, values)

        notification.success({
          message: "Employee's skills successfully updated!",
        })

        onClose()
        onAfterSubmit()
      }
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, "Could not update employee's skills"),
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
            <Form.Item label="Chapters" name="chapters">
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getChaptersMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={[GET_PATHS.getChapterMetadata, 'edit-skills']}
                placeholder="Select chapters"
                // Store selected chapters list to render options for selecting leading chapters
                // since an employee has to be in chapter to become a chapter lead
                onSelect={(o: string) => {
                  setSelectedChapters([...selectedChapters, o])
                }}
                onDeselect={(o: string) => {
                  const newSelectedChapters: string[] = []

                  selectedChapters.forEach((c) => {
                    if (c !== o) newSelectedChapters.push(c)
                  })

                  setSelectedChapters(newSelectedChapters)
                }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Leading chapters" name="leadingChapters">
              <Select
                mode="multiple"
                style={{ background: theme.colors.white }}
                placeholder={
                  selectedChapters.length === 0
                    ? 'Please select chapters first'
                    : 'Select leading chapters'
                }
                showSearch
                showArrow
                options={
                  data?.data
                    ?.filter((d) => d.id && selectedChapters.includes(d.id))
                    .map(transformMetadataToSelectOption) || []
                }
                filterOption={searchFilterOption}
                maxTagCount="responsive"
                allowClear
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
