import { Col, Form, Input, Modal, notification, Row, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { ViewProfileData } from 'types/schema'
import {
  formatPhoneNumber,
  getErrorMessage,
  removeLeadingZero,
} from 'utils/string'

type ProfileInfoFormValues = Pick<
  ViewProfileData,
  | 'phoneNumber'
  | 'personalEmail'
  | 'teamEmail'
  | 'address'
  | 'city'
  | 'country'
  | 'placeOfResidence'
>

interface Props {
  isOpen: boolean
  initialValues: ProfileInfoFormValues
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditProfileInfoModal = (props: Props) => {
  const { isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasPrefix = (initialValues?.phoneNumber || '').includes('+') || false

  const [dialCode, setDialCode] = useState<string>(
    hasPrefix
      ? (initialValues?.phoneNumber || '').split(' ')[0].slice(1) || ''
      : '84',
  )

  const { data: countryData, loading: isCountryLoading } = useFetchWithCache(
    [GET_PATHS.getCountryMetadata],
    () => client.getCountryMetadata(),
  )
  const countries = countryData?.data || []
  const country = Form.useWatch('country', form)

  const onSubmit = async (values: ProfileInfoFormValues) => {
    try {
      setIsSubmitting(true)
      await client.updateProfile({
        ...values,
        phoneNumber: values.phoneNumber?.includes(' ') // need to check this for the case submit without editing
          ? // in case phoneNumber is not edited, the value has the form +84 12345...
            values.phoneNumber
          : // otherwise its value is passed from PhoneInput's
            // onChange and has the form of 8412345...
            `+${dialCode} ${removeLeadingZero(
              values.phoneNumber!.slice(dialCode.length),
            )}`,
      })

      notification.success({ message: 'Profile info updated successfully!' })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not update profile info'),
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
      title="Edit Profile"
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          ...initialValues,
          phoneNumber: formatPhoneNumber(dialCode, initialValues.phoneNumber),
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Required' }]}
            >
              <PhoneInput
                country="vn"
                onChange={(value, data) => {
                  // store dial code and phone number individually
                  form.setFieldValue('phoneNumber', value)
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
            <Form.Item
              label="Team Email"
              name="teamEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input placeholder="Enter team email" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input placeholder="Enter personal email" className="bordered" />
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
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Enter Address" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                showSearch
                loading={isCountryLoading}
                placeholder="Select country"
                options={countries.map((c) => {
                  return {
                    label: c.name,
                    value: c.name,
                  }
                })}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                showSearch
                loading={isCountryLoading}
                placeholder="Select city"
                options={
                  countries
                    .find((c) => c.name === country)
                    ?.cities?.map((city) => ({
                      label: city.name,
                      value: city.name,
                    })) || []
                }
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Place of Residence"
              name="placeOfResidence"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                placeholder="Enter Place of Residence"
                className="bordered"
              />
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
