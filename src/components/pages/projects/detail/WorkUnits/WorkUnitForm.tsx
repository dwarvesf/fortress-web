import { Form, Row, Col, Input, FormInstance } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
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
  const {
    initialValues = { status: 'Active' },
    isEditing = false,
    form,
    onSubmit,
  } = props

  const {
    query: { id: projectId },
  } = useRouter()

  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
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
            {/* TODO: update api is ready */}
            <AsyncSelect
              mode="multiple"
              maxTagCount={undefined}
              optionGetter={async () => {
                const { data: activeMembers } =
                  await client.getProjectMemberList(projectId as string, {
                    page: 1,
                    size: 1000,
                    status: 'active',
                  })

                const { data: inactiveMembers } =
                  await client.getProjectMemberList(projectId as string, {
                    page: 1,
                    size: 1000,
                    status: 'inactive',
                  })

                const { data: onBoardingMembers } =
                  await client.getProjectMemberList(projectId as string, {
                    page: 1,
                    size: 1000,
                    status: 'on-boarding',
                  })

                return [
                  ...(activeMembers || []),
                  ...(inactiveMembers || []),
                  ...(onBoardingMembers || []),
                ].map(transformProjectMemberDataToSelectOption)
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
            label="Stack"
            name="stacks"
            rules={[{ required: true, message: 'Please select stack' }]}
          >
            <AsyncSelect
              mode="multiple"
              placeholder="Select work unit's stack"
              swrKeys={[
                GET_PATHS.getStackMetadata,
                projectId as string,
                'work-unit-stack',
              ]}
              optionGetter={async () =>
                ((await client.getStackMetadata()).data || []).map(
                  transformMetadataToSelectOption,
                )
              }
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: isEditing ? 24 : 12 }}>
          <Form.Item label="Type" name="type">
            <AsyncSelect
              optionGetter={() =>
                Promise.resolve(
                  ['Repository', 'Team'].map((key) => ({
                    value: key,
                    label: key,
                  })),
                )
              }
              swrKeys="/work-unit/type"
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
                    ['Active', 'Archived'].map((key) => ({
                      value: key,
                      label: key,
                    })),
                  )
                }
                swrKeys="/work-unit/status"
                placeholder="Select work unit status"
                defaultValue="Active"
                customOptionRenderer={renderStatusOption}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  )
}
