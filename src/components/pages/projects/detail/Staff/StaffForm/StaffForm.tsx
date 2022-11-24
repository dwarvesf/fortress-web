import { Checkbox, Col, Form, Input, Row, Select } from 'antd'
import { client, GET_PATHS } from 'libs/apis'
import { GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput } from 'types/schema'
import { AsyncSelect } from 'components/common/Select'
import {
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { ProjectStaffStatus, projectStaffStatuses } from 'constants/status'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { FormInstance } from 'antd/es/form/Form'

export type StaffFormValues =
  Partial<GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput>

interface Props {
  form: FormInstance<any>
  initialValues?: StaffFormValues
  onSubmit: (values: StaffFormValues) => void
}

export const StaffForm = (props: Props) => {
  const { form, initialValues, onSubmit } = props

  const status = Form.useWatch('status', form)
  const isStatusPending = status === 'pending'

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={{
        ...initialValues,
      }}
    >
      <Row gutter={24}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Member"
            name="employeeID"
            required={!isStatusPending}
            rules={[{ required: !isStatusPending }]}
          >
            <AsyncSelect
              placeholder="Select a member"
              swrKeys={[GET_PATHS.getEmployees]}
              optionGetter={async () => {
                const { data } = await client.getEmployees({
                  page: 1,
                  size: 1000,
                  workingStatus: 'full-time',
                  preload: false,
                })
                return (data || []).map(transformEmployeeDataToSelectOption)
              }}
              customOptionRenderer={renderEmployeeOption}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniorityID"
            required
            rules={[{ required: true }]}
          >
            <AsyncSelect
              placeholder="Select seniority"
              swrKeys={[GET_PATHS.getSeniorityMetadata]}
              optionGetter={async () =>
                ((await client.getSenioritiesMetadata()).data || []).map(
                  transformMetadataToSelectOption,
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Positions"
            name="positions"
            required
            rules={[{ required: true }]}
          >
            <AsyncSelect
              placeholder="Select positions"
              mode="multiple"
              swrKeys={[GET_PATHS.getPositionMetadata]}
              optionGetter={async () =>
                ((await client.getPositionsMetadata()).data || []).map(
                  transformMetadataToSelectOption,
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Deployment Type"
            name="deploymentType"
            required
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select deployment type"
              options={Object.keys(deploymentTypes).map((status) => {
                return {
                  label: deploymentTypes[status as DeploymentType],
                  value: status,
                }
              })}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Joined Date" name="joinedDate">
            <Input
              type="date"
              placeholder="Select joined date"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Left Date" name="leftDate">
            <Input
              type="date"
              placeholder="Select left date"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Rate"
            name="rate"
            required
            rules={[{ required: true }]}
          >
            <Input
              type="number"
              placeholder="Enter rate"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Discount" name="discount">
            <Input
              type="number"
              placeholder="Enter rate"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Status" name="status">
            <Select
              placeholder="Select status"
              options={Object.keys(projectStaffStatuses).map((status) => {
                return {
                  label: projectStaffStatuses[status as ProjectStaffStatus],
                  value: status,
                }
              })}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Role" name="isLead" valuePropName="checked">
            <Checkbox>Is Lead</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
