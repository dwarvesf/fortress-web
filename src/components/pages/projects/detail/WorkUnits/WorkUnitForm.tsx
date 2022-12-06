import { Form, Row, Col, Input, FormInstance } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import {
  ProjectWorkUnitStatus,
  projectWorkUnitStatuses,
} from 'constants/status'
import { WorkUnitType, workUnitTypes } from 'constants/workUnitTypes'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { PkgHandlerProjectCreateWorkUnitBody } from 'types/schema'
import {
  transformMetadataToSelectOption,
  transformProjectMemberDataToSelectOption,
} from 'utils/select'

interface Props {
  initialValues?: PkgHandlerProjectCreateWorkUnitBody
  form: FormInstance<any>
  onSubmit: (values: PkgHandlerProjectCreateWorkUnitBody) => void
  isEditing?: boolean
}

export const WorkUnitForm = (props: Props) => {
  const { initialValues, isEditing = false, form, onSubmit } = props

  const {
    query: { id: projectId },
  } = useRouter()

  return (
    <Form
      form={form}
      initialValues={{ ...initialValues, status: ProjectWorkUnitStatus.ACTIVE }}
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input name' },
              {
                max: 99,
                message: 'Name must be less than 100 characters',
              },
            ]}
          >
            <Input
              className="bordered"
              type="text"
              placeholder="Enter work unit name"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="URL" name="url">
            <Input className="bordered" type="text" placeholder="Enter URL" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Members" name="members">
            <AsyncSelect
              mode="multiple"
              maxTagCount={undefined}
              optionGetter={async () => {
                const { data } = await client.getProjectMemberList(
                  projectId as string,
                  {
                    page: 1,
                    size: 1000,
                    status: 'active',
                    preload: false,
                  },
                )

                return (data || [])
                  .filter((d) => d.employeeID !== '')
                  .map(transformProjectMemberDataToSelectOption)
              }}
              swrKeys={[
                GET_PATHS.getEmployees,
                projectId as string,
                'work-unit-member',
              ]}
              placeholder="Select work unit's member"
              customOptionRenderer={renderEmployeeOption}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Tech stack"
            name="stacks"
            rules={[{ required: true, message: 'Please select tech stack' }]}
          >
            <AsyncSelect
              mode="multiple"
              placeholder="Select work unit's stack"
              swrKeys={[
                GET_PATHS.getStackMetadata,
                projectId as string,
                'work-unit-stack',
              ]}
              optionGetter={async () => {
                const { data } = await client.getStackMetadata()
                return data?.map(transformMetadataToSelectOption) || []
              }}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: isEditing ? 24 : 12 }}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select type' }]}
          >
            <AsyncSelect
              optionGetter={() =>
                Promise.resolve(
                  Object.keys(workUnitTypes).map((key) => ({
                    value: key,
                    label: workUnitTypes[key as WorkUnitType],
                  })),
                )
              }
              swrKeys="work-unit-type"
              placeholder="Select work unit type"
            />
          </Form.Item>
        </Col>

        {!isEditing && (
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Status" name="status">
              <AsyncSelect
                optionGetter={() =>
                  Promise.resolve(
                    Object.keys(projectWorkUnitStatuses).map((key) => ({
                      value: key,
                      label:
                        projectWorkUnitStatuses[key as ProjectWorkUnitStatus],
                    })),
                  )
                }
                swrKeys="work-unit-status"
                placeholder="Select work unit status"
                customOptionRenderer={renderStatusOption}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  )
}
