import { Checkbox, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { client, GET_PATHS, Meta } from 'libs/apis'
import {
  RequestUpdateMemberInput,
  ViewEmployeeListDataResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import {
  EmployeeStatus,
  ProjectMemberStatus,
  projectMemberStatuses,
} from 'constants/status'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { FormInstance } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { theme } from 'styles'
import { fullListPagination } from 'types/filters/Pagination'
import { SELECT_BOX_DATE_FORMAT } from 'constants/date'
import TextArea from 'antd/lib/input/TextArea'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Permission } from 'constants/permission'
import { NumericFormat } from 'react-number-format'
import { EmployeeFormMeta } from 'types/form/misc'

const today = new Date()

export type MemberFormValues = Partial<
  Omit<RequestUpdateMemberInput, 'startDate' | 'endDate'>
> & { startDate?: moment.Moment; endDate?: moment.Moment }

interface Props {
  isAssigning?: boolean
  form: FormInstance<any>
  initialValues?: MemberFormValues
  excludedEmployeeIds?: string[]
  meta?: EmployeeFormMeta
  onSubmit: (values: MemberFormValues) => void
  getDataOnSubmit?: (
    e: ViewEmployeeListDataResponse & Meta,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
}

const RateInput = (props: any) => (
  <Input {...props} className="bordered" suffix="%" />
)

export const MemberForm = (props: Props) => {
  const {
    isAssigning = false,
    form,
    initialValues,
    excludedEmployeeIds = [],
    meta,
    onSubmit,
    getDataOnSubmit,
  } = props

  const employeeID = Form.useWatch('employeeID', form)
  const status: ProjectMemberStatus = Form.useWatch('status', form)
  const isLead: boolean = Form.useWatch('isLead', form)

  const { data: employeesData, loading: isEmployeesDataLoading } =
    useFetchWithCache(
      [GET_PATHS.getEmployees, excludedEmployeeIds.join('')],
      () =>
        client.getEmployees({
          ...fullListPagination,
          // Only get active employees
          workingStatuses: Object.values(EmployeeStatus).filter(
            (status) => status !== EmployeeStatus.LEFT,
          ),
        }),
    )

  const { data: senioritiesData, loading: isSenioritiesDataLoading } =
    useFetchWithCache([GET_PATHS.getSeniorityMetadata], () =>
      client.getSenioritiesMetadata(),
    )

  const { data: positionsData, loading: isPositionsDataLoading } =
    useFetchWithCache([GET_PATHS.getPositionMetadata], () =>
      client.getPositionsMetadata(),
    )

  // Set status to active if user selected an employee
  // We don't allow pending status if employeeID is available
  useEffect(() => {
    if (employeeID && status === ProjectMemberStatus.PENDING) {
      form.setFieldValue('status', ProjectMemberStatus.ACTIVE)
    }
  }, [employeeID]) // eslint-disable-line

  const isPending = status === ProjectMemberStatus.PENDING
  const isInactive = status === ProjectMemberStatus.INACTIVE

  return (
    <Form
      form={form}
      onFinish={(values) => {
        if (typeof getDataOnSubmit === 'function') {
          getDataOnSubmit(employeesData!, senioritiesData!, positionsData!)
        }
        onSubmit(values)
      }}
      initialValues={{
        ...initialValues,
      }}
    >
      <Row gutter={24}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Member"
            name="employeeID"
            required={!isPending}
            rules={[{ required: !isPending, message: 'Required' }]}
          >
            <Select
              style={{
                background: theme.colors.white,
              }}
              placeholder={
                isEmployeesDataLoading ? 'Fetching data' : 'Select a member'
              }
              loading={isEmployeesDataLoading}
              disabled={isEmployeesDataLoading || !!initialValues?.employeeID}
              showSearch
              showArrow
              filterOption={searchFilterOption}
            >
              {(employeesData?.data || [])
                .filter(
                  (employee) =>
                    !excludedEmployeeIds.includes(employee?.id || ''),
                )
                .map(transformEmployeeDataToSelectOption)
                .map(renderEmployeeOption)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniorityID"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              style={{
                background: theme.colors.white,
              }}
              placeholder={
                isSenioritiesDataLoading ? 'Fetching data' : 'Select seniority'
              }
              loading={isSenioritiesDataLoading}
              disabled={isSenioritiesDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
              options={senioritiesData?.data?.map(
                transformMetadataToSelectOption,
              )}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Positions"
            name="positions"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              mode="multiple"
              style={{
                background: theme.colors.white,
                overflow: 'auto',
              }}
              placeholder={
                isPositionsDataLoading ? 'Fetching data' : 'Select positions'
              }
              loading={isPositionsDataLoading}
              disabled={isPositionsDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
              maxTagCount="responsive"
              options={positionsData?.data?.map(
                transformMetadataToSelectOption,
              )}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Deployment Type"
            name="deploymentType"
            rules={[{ required: true, message: 'Required' }]}
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
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: isAssigning, message: 'Required' }]}
          >
            <Select
              placeholder="Select status"
              options={Object.keys(projectMemberStatuses)
                .filter((status) => {
                  if (isAssigning && status === ProjectMemberStatus.INACTIVE) {
                    return false
                  }

                  if (employeeID && status === ProjectMemberStatus.PENDING) {
                    return false
                  }

                  return true
                })
                .map((status) => {
                  return {
                    label: projectMemberStatuses[status as ProjectMemberStatus],
                    value: status,
                  }
                })}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: isAssigning && !isPending, message: 'Required' },
            ]}
          >
            <DatePicker
              format={SELECT_BOX_DATE_FORMAT}
              style={{ width: '100%' }}
              placeholder="Select start date"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: isInactive, message: 'Required' }]}
          >
            <DatePicker
              format={SELECT_BOX_DATE_FORMAT}
              style={{ width: '100%' }}
              placeholder="Select end date"
              className="bordered"
              disabledDate={(date) => {
                // If status is not inactive, if we need to provide an endDate,
                // it must be some date into the future
                if (!isInactive && date.isBefore(today)) {
                  return true
                }

                return false
              }}
            />
          </Form.Item>
        </Col>
        <AuthenticatedContent permission={Permission.PROJECTMEMBERS_RATE_EDIT}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Rate"
              name="rate"
              rules={[{ required: true, message: 'Required' }]}
              normalize={(value) =>
                value ? Number(value.replace(/[^\d.]/g, '')) : undefined
              }
            >
              <NumericFormat
                className="bordered"
                placeholder="Enter rate"
                thousandSeparator=","
                allowNegative={false}
                decimalScale={3}
                suffix={meta?.currency}
                customInput={Input}
              />
            </Form.Item>
          </Col>
        </AuthenticatedContent>
        <AuthenticatedContent permission={Permission.PROJECTMEMBERS_RATE_EDIT}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Discount"
              name="discount"
              normalize={(value) =>
                value ? Number(value.replace(/[^\d.]/g, '')) : undefined
              }
            >
              <NumericFormat
                className="bordered"
                placeholder="Enter discount"
                thousandSeparator=","
                allowNegative={false}
                decimalScale={3}
                customInput={Input}
              />
            </Form.Item>
          </Col>
        </AuthenticatedContent>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Upsell Person" name="upsellPersonID">
            <Select
              style={{
                background: theme.colors.white,
              }}
              placeholder={
                isEmployeesDataLoading ? 'Fetching data' : 'Select a member'
              }
              loading={isEmployeesDataLoading}
              disabled={isEmployeesDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
            >
              {(employeesData?.data || [])
                .map(transformEmployeeDataToSelectOption)
                .map(renderEmployeeOption)}
            </Select>
          </Form.Item>
        </Col>
        <AuthenticatedContent
          permission={Permission.PROJECTS_COMMISSIONRATE_EDIT}
        >
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Upsell Commission Rate"
              name="upsellCommissionRate"
            >
              <NumericFormat
                placeholder="0"
                allowNegative={false}
                decimalScale={0}
                customInput={RateInput}
                isAllowed={(values) =>
                  values.floatValue === undefined ||
                  (values.floatValue >= 0 && values.floatValue <= 100)
                }
              />
            </Form.Item>
          </Col>
        </AuthenticatedContent>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Role" name="isLead" valuePropName="checked">
            <Checkbox>Is Lead</Checkbox>
          </Form.Item>
        </Col>

        {isLead && (
          <Col span={24} md={{ span: 12 }}>
            <AuthenticatedContent
              permission={Permission.PROJECTS_COMMISSIONRATE_EDIT}
            >
              <Form.Item label="Lead Commission Rate" name="leadCommissionRate">
                <NumericFormat
                  placeholder="0"
                  allowNegative={false}
                  decimalScale={0}
                  customInput={RateInput}
                  isAllowed={(values) =>
                    values.floatValue === undefined ||
                    (values.floatValue >= 0 && values.floatValue <= 100)
                  }
                />
              </Form.Item>
            </AuthenticatedContent>
          </Col>
        )}
        <Col span={24}>
          <Form.Item label="Notes" name="note">
            <TextArea
              placeholder="Enter notes"
              rows={4}
              bordered
              className="bordered"
              style={{ resize: 'none', background: theme.colors.white }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
