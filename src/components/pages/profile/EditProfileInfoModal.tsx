import { Col, Form, Input, Modal, notification, Row, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { ViewProfileData } from 'types/schema'
import { getErrorMessage } from 'utils/string'

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

  const { data: countryData, loading: isCountryLoading } = useFetchWithCache(
    [GET_PATHS.getCountryMetadata],
    () => client.getCountryMetadata(),
  )
  const countries = countryData?.data || []
  const country = Form.useWatch('country', form)

  const onSubmit = async (values: ProfileInfoFormValues) => {
    try {
      setIsSubmitting(true)
      await client.updateProfile(values)

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
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              required
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Enter phone number" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team Email"
              name="teamEmail"
              required
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
              required
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input placeholder="Enter personal email" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Enter Address" className="bordered" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Country" name="country">
              <Select
                loading={isCountryLoading}
                placeholder="Select country"
                options={countries.map((c) => {
                  return {
                    label: c.name,
                    value: c.name,
                  }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="City" name="city">
              <Select
                loading={isCountryLoading}
                placeholder="Select city"
                options={
                  countries
                    .find((c) => c.name === country)
                    // @ts-ignore
                    ?.cities.map((city) => {
                      return {
                        label: city,
                        value: city,
                      }
                    }) || []
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Place of Residence" name="placeOfResidence">
              <Input
                placeholder="Enter Place of Residence"
                className="bordered"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
