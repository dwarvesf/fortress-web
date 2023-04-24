import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from 'antd'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { GET_PATHS, client } from 'libs/apis'
import { useState } from 'react'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestUpdateEmployeeGeneralInfoInput } from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformOrganizationMetaDataToSelectOption,
} from 'utils/select'
import PhoneInput from 'react-phone-input-2'
import {
  formatPhoneNumber,
  getErrorMessage,
  removeLeadingZero,
} from 'utils/string'
import { SELECT_BOX_DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'
import { renderOrganizationOption } from 'components/common/Select/renderers/organizationOption'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { theme } from 'styles'

type FormValues = Partial<
  Omit<RequestUpdateEmployeeGeneralInfoInput, 'joinedDate' | 'leftDate'>
> & {
  joinedDate?: moment.Moment
  leftDate?: moment.Moment
}

interface Props {
  employeeID: string
  isOpen: boolean
  initialValues?: FormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditGeneralInfoModal = (props: Props) => {
  const { employeeID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const hasPrefix = initialValues?.phone?.includes('+') || false

  const [dialCode, setDialCode] = useState<string>(
    hasPrefix ? initialValues?.phone?.split(' ')[0].slice(1) || '' : '84',
  )

  const { data: organizationsMetaData } = useFetchWithCache(
    [GET_PATHS.getOrganizationMetadata],
    () => client.getOrganizationMetadata(),
  )

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      await client.updateEmployeeGeneralInfo(employeeID, {
        ...values,
        phone: values.phone?.includes(' ') // need to check this for the case submit without editing
          ? // in case phone is not edited, the value has the form +84 12345...
            values.phone
          : // otherwise its value is passed from PhoneInput's
            // onChange and has the form of 8412345...
            `+${dialCode} ${removeLeadingZero(
              (values.phone || '').slice(dialCode.length),
            )}`,
        joinedDate: values.joinedDate
          ? values.joinedDate.format(SERVER_DATE_FORMAT)
          : '',
        leftDate: values.leftDate
          ? values.leftDate.format(SERVER_DATE_FORMAT)
          : '',
      } as RequestUpdateEmployeeGeneralInfoInput)

      notification.success({
        message: "Employee's general info successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update employee's general info",
        ),
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
      title="Edit General Info"
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          ...initialValues,
          // pass phone manually since antd Form pass value through
          // 'name' attr and overwrite PhoneInput's value
          phone: formatPhoneNumber(dialCode, initialValues?.phone),
          organizationIDs: (initialValues?.organizationIDs || []).length
            ? initialValues?.organizationIDs
            : [
                organizationsMetaData?.data?.find(
                  (d) => d.code === 'dwarves-foundation',
                )?.id,
              ],
        }}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Full name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Display Name"
              name="displayName"
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
                placeholder="Enter display name"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team Email"
              name="email"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter team email"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Required' }]}
            >
              <PhoneInput
                country="vn"
                onChange={(value, data) => {
                  // store dial code and phone number individually
                  form.setFieldValue('phone', value)
                  if ('dialCode' in data) {
                    setDialCode(data.dialCode)
                  }
                }}
                inputStyle={{ width: '100%', height: 40 }}
                enableSearch
                disableSearchIcon
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Line Manager" name="lineManagerID">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getEmployees({
                    ...fullListPagination,
                  })
                  return (data || []).map(transformEmployeeDataToSelectOption)
                }}
                swrKeys={GET_PATHS.getEmployees}
                placeholder="Select line manager"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Discord" name="discordName">
              <Input placeholder="johndoe#xxxx" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Github" name="githubID">
              <Input placeholder="johndoe" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Notion" name="notionName">
              <Input placeholder="John Doe" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="LinkedIn" name="linkedInName">
              <Input placeholder="john-doe-1234" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Joined Date" name="joinedDate">
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select joined date"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Left Date" name="leftDate">
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select left date"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Referred By" name="referredBy">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getEmployees({
                    ...fullListPagination,
                  })
                  return data?.map(transformEmployeeDataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getEmployees}
                placeholder="Select referrer"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Organizations"
              name="organizationIDs"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                mode="multiple"
                style={{ background: theme.colors.white }}
                placeholder="Select organization"
                showSearch
                showArrow
                filterOption={searchFilterOption}
              >
                {(organizationsMetaData?.data || [])
                  .map(transformOrganizationMetaDataToSelectOption)
                  .map(renderOrganizationOption)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Wise Account Number" name="wiseAccountNumber">
              <Input
                placeholder="Enter Wise Account Number"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Wise Currency" name="wiseCurrency">
              <AsyncSelect
                swrKeys={[GET_PATHS.getCurrencyMetadata]}
                placeholder="Select Wise Currency"
                optionGetter={async () => {
                  return ((await client.getCurrencyMetadata()).data || []).map(
                    (c) => ({
                      label: c.name,
                      value: c.name,
                    }),
                  )
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Wise Recipient Email"
              name="wiseRecipientEmail"
              rules={[{ type: 'email', message: 'Wrong email format' }]}
            >
              <Input
                type="email"
                placeholder="Enter Wise Recipient Email"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Wise Recipient ID" name="wiseRecipientID">
              <Input
                placeholder="Enter Wise Recipient ID"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Wise Recipient Name" name="wiseRecipientName">
              <Input
                placeholder="Enter Wise Recipient Name"
                className="bordered"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
