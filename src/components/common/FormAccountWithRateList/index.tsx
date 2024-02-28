import { Icon } from '@iconify/react'
import { Form, FormInstance, Input, SelectProps } from 'antd'
import { Rule } from 'antd/lib/form'
import { Permission } from 'constants/permission'
import { EmployeeStatus } from 'constants/status'
import { GET_PATHS, client } from 'libs/apis'
import { useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import { fullListPagination } from 'types/filters/Pagination'
import { transformEmployeeDataToSelectOption } from 'utils/select'
import { AuthenticatedContent } from '../AuthenticatedContent'
import { Button } from '../Button'
import { AsyncSelect } from '../Select'
import { renderEmployeeOption } from '../Select/renderers/employeeOption'

interface Props {
  form: FormInstance
  name: string | number | (string | number)[]
  label?: string
  rules?: Rule[]
  selectProps?: SelectProps
}

const employeeOptionGetter = async () => {
  const { data } = await client.getEmployees({
    ...fullListPagination,
    // Only get active employees
    workingStatuses: Object.values(EmployeeStatus).filter(
      (status) => status !== EmployeeStatus.LEFT,
    ),
  })
  return (data || []).map(transformEmployeeDataToSelectOption)
}

const RateInput = (props: any) => (
  <Input {...props} className="bordered" suffix="%" />
)

export const FormAccountWithRateList = (props: Props) => {
  const { form, name, label, rules, selectProps } = props
  const { getFieldValue, setFieldValue } = form

  useEffect(() => {
    if (!getFieldValue(name)?.length) {
      setFieldValue(name, [{}])
    }
  }, [getFieldValue, name, setFieldValue])

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) =>
        fields.map((field, index) => (
          <div
            key={field.key}
            style={{
              marginBottom: index === fields.length - 1 ? 24 : 10,
              position: 'relative',
              display: 'flex',
            }}
          >
            <Form.Item
              key={`${field.key}_employeeID`}
              name={[field.name, 'employeeID']}
              label={index === 0 && label}
              style={{ marginBottom: 0, flex: '1' }}
              rules={rules}
            >
              <AsyncSelect
                swrKeys={GET_PATHS.getEmployees}
                optionGetter={employeeOptionGetter}
                customOptionRenderer={renderEmployeeOption}
                allowClear={false}
                showArrow={false}
                {...selectProps}
              />
            </Form.Item>
            <AuthenticatedContent
              permission={Permission.PROJECTS_COMMISSIONRATE_EDIT}
            >
              <Form.Item
                key={`${field.key}_commissionRate`}
                name={[field.name, 'commissionRate']}
                label={index === 0 && 'Commission Rate'}
                style={{ marginBottom: 0, width: 120, marginLeft: 10 }}
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
            </AuthenticatedContent>
            <Form.Item
              label={
                index === 0 && (
                  <Button
                    type="text-primary"
                    size="small"
                    icon={<Icon icon="icon-park-outline:plus" width={20} />}
                    onClick={() => add()}
                  />
                )
              }
              style={{ marginBottom: 0, marginLeft: 10 }}
            >
              <Button
                type="text-primary"
                size="small"
                icon={<Icon icon="icon-park-outline:delete-one" width={20} />}
                onClick={() => {
                  if (fields.length > 1) {
                    remove(index)
                  } else {
                    setFieldValue(name, [{}])
                  }
                }}
              />
            </Form.Item>
          </div>
        ))
      }
    </Form.List>
  )
}
