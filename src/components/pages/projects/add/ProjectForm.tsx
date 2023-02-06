import { Form, Row, Col, Input, DatePicker, Select } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { FormInputList } from 'components/common/FormInputList'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import { SELECT_BOX_DATE_FORMAT } from 'constants/date'
import {
  ProjectFunction,
  projectFunctions,
  projectTypes,
} from 'constants/projectTypes'
import { GET_PATHS, client } from 'libs/apis'
import { theme } from 'styles'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestCreateProjectInput } from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'

export type ProjectFormValues = Omit<RequestCreateProjectInput, 'startDate'> & {
  startDate?: moment.Moment
}

interface Props {
  form: FormInstance<any>
  initialValues?: ProjectFormValues
  onSubmit: (values: ProjectFormValues) => Promise<void>
}

export const ProjectForm = (props: Props) => {
  const { form, initialValues, onSubmit } = props

  const employeeOptionGetter = async () => {
    const { data } = await client.getEmployees({
      ...fullListPagination,
    })
    return (data || []).map(transformEmployeeDataToSelectOption)
  }

  return (
    <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
      <Row gutter={24}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              { required: true, message: 'Required' },
              {
                max: 99,
                message: 'Display name must be less than 100 characters',
              },
            ]}
          >
            <Input
              className="bordered"
              type="text"
              placeholder="Enter project name"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AsyncSelect
              optionGetter={async () => {
                const { data } = await client.getProjectStatusMetadata()
                return data.map(transformMetadataToSelectOption)
              }}
              swrKeys={GET_PATHS.getProjectStatusMetadata}
              placeholder="Select project status"
              customOptionRenderer={renderStatusOption}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Account Manager"
            name="accountManagerID"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AsyncSelect
              optionGetter={employeeOptionGetter}
              swrKeys={GET_PATHS.getEmployees}
              placeholder="Select account manager"
              customOptionRenderer={renderEmployeeOption}
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
              optionGetter={async () => {
                const { data } = await client.getCountryMetadata()
                return data.map(transformMetadataToSelectOption)
              }}
              swrKeys={GET_PATHS.getCountryMetadata}
              placeholder="Select project country"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Delivery Manager" name="deliveryManagerID">
            <AsyncSelect
              optionGetter={employeeOptionGetter}
              swrKeys={GET_PATHS.getEmployees}
              placeholder="Select delivery manager"
              customOptionRenderer={renderEmployeeOption}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker
              bordered
              className="bg-white bordered"
              format={SELECT_BOX_DATE_FORMAT}
              style={{ width: '100%', borderColor: theme.colors.white }}
              placeholder="Select start date"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 24 }}>
          <Form.Item
            label="Project Email"
            name="projectEmail"
            rules={[
              { required: true, message: 'Required' },
              { type: 'email', message: 'Wrong email format' },
            ]}
          >
            <Input
              className="bordered"
              type="email"
              placeholder="Enter project email"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 24 }}>
          <FormInputList
            form={form}
            name="clientEmail"
            label="Client Email"
            rules={[
              { type: 'email', message: 'Wrong email format' },
              { required: true, message: 'Required' },
            ]}
            addButtonProps={{ children: 'Add email' }}
            inputProps={{ type: 'email', placeholder: 'Enter client email' }}
          />
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              style={{ background: theme.colors.white }}
              placeholder="Select type"
              showSearch
              showArrow
              options={Object.keys(projectTypes).map((key) => ({
                value: key,
                label: projectTypes[key as keyof typeof projectTypes],
              }))}
              filterOption={searchFilterOption}
              maxTagCount="responsive"
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
          <Form.Item label="Notion ID" name="notionID">
            <Input
              placeholder="123e4567-e89b-12d3-a456-426655440000"
              className="bordered"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
