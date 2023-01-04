import { Form, Row, Col, Input, FormInstance, Select } from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import {
  ProjectWorkUnitStatus,
  projectWorkUnitStatuses,
} from 'constants/status'
import { WorkUnitType, workUnitTypes } from 'constants/workUnitTypes'
import { client, GET_PATHS } from 'libs/apis'
import { theme } from 'styles'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestCreateWorkUnitBody } from 'types/schema'
import {
  searchFilterOption,
  transformMetadataToSelectOption,
  transformProjectMemberDataToSelectOption,
} from 'utils/select'

interface Props {
  projectID: string
  initialValues?: RequestCreateWorkUnitBody
  form: FormInstance<any>
  isEditing?: boolean
  onSubmit: (values: RequestCreateWorkUnitBody) => void
}

export const WorkUnitForm = (props: Props) => {
  const { projectID, initialValues, isEditing = false, form, onSubmit } = props

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
              { required: true, message: 'Required' },
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
                  projectID as string,
                  {
                    ...fullListPagination,
                    status: 'active',
                  },
                )

                return (data || [])
                  .filter((d) => d.employeeID !== '')
                  .map(transformProjectMemberDataToSelectOption)
              }}
              swrKeys={[GET_PATHS.getEmployees, projectID as string]}
              placeholder="Select work unit's members"
              customOptionRenderer={renderEmployeeOption}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Tech stack"
            name="stacks"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AsyncSelect
              mode="multiple"
              placeholder="Select work unit's stack"
              swrKeys={[GET_PATHS.getStackMetadata, projectID as string]}
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
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              style={{ background: theme.colors.white }}
              placeholder="Select work unit type"
              showSearch
              showArrow
              options={Object.keys(workUnitTypes).map((key) => ({
                value: key,
                label: workUnitTypes[key as WorkUnitType],
              }))}
              filterOption={searchFilterOption}
              maxTagCount="responsive"
            />
          </Form.Item>
        </Col>

        {!isEditing && (
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Status" name="status">
              <Select
                style={{ background: theme.colors.white }}
                placeholder="Select work unit status"
                showSearch
                showArrow
                filterOption={searchFilterOption}
                maxTagCount="responsive"
              >
                {Object.keys(projectWorkUnitStatuses)
                  .map((key) => ({
                    value: key,
                    label:
                      projectWorkUnitStatuses[key as ProjectWorkUnitStatus],
                  }))
                  .map(renderStatusOption)}
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  )
}
