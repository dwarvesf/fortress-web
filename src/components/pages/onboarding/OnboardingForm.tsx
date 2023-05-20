import {
  Form,
  Row,
  Col,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
  UploadProps,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload'
import { FormWrapper } from 'components/common/FormWrapper'
import { AsyncSelect } from 'components/common/Select'
import { SELECT_BOX_DATE_FORMAT } from 'constants/date'
import { horoscopeList } from 'constants/horoscopes'
import { ROUTES } from 'constants/routes'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { ModelCountry, RequestSubmitOnboardingFormRequest } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { getBase64 } from 'utils/uploadFile'
import { renderCountryOption } from 'components/common/Select/renderers/countryOption'
import { v4 as uuid4 } from 'uuid'
import { UploadImageItem } from './UploadImageItem'

interface UploadStatus {
  uploading?: boolean
  url?: string
}

interface UploadFiles {
  identityCardPhotoFront?: UploadStatus
  identityCardPhotoBack?: UploadStatus
  passportPhotoFront?: UploadStatus
  passportPhotoBack?: UploadStatus
}

export const OnboardingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countries, setCountries] = useState<ModelCountry[]>([])
  const [uploadFiles, setUploadFiles] = useReducer<
    (prev: UploadFiles, next: UploadFiles) => UploadFiles
  >((prev, next) => {
    return { ...prev, ...next }
  }, {})
  const { push, query } = useRouter()
  const [form] = Form.useForm()
  const { setFieldValue } = form

  const onCreateSubmit = async (values: RequestSubmitOnboardingFormRequest) => {
    try {
      setIsSubmitting(true)

      const assets = await uploadAssets(values)
      await client.submitOnboardingForm(
        {
          ...transformDataToSend(values),
          ...assets,
        },
        query.code as string,
      )

      notification.success({
        message: 'Onboarding form successfully submitted!',
      })

      // Redirect to employee list page if create successfully
      setTimeout(() => push(ROUTES.HOME))
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not submit onboarding form'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadAssets = async (values: Required<Record<string, any>>) => {
    const keys = [
      'identityCardPhotoFront',
      'identityCardPhotoBack',
      'passportPhotoFront',
      'passportPhotoBack',
    ]
    if (
      (!values.identityCardPhotoFront || !values.identityCardPhotoBack) &&
      (!values.passportPhotoFront || !values.passportPhotoBack)
    ) {
      throw new Error('Missing ID/Passport documents')
    }
    const uploadResult = await Promise.allSettled(
      keys.map((key) => {
        if (!values[key]?.file?.originFileObj) return null
        const file = values[key].file.originFileObj
        const formData = new FormData()
        formData.append('file', file, `${uuid4() as string}.png`)
        formData.append('type', 'image')
        formData.append('targetType', 'employees')
        return client.uploadAsset(formData, query.code as string)
      }),
    )
    return uploadResult.reduce(
      (prev, result, index) => ({
        ...prev,
        [keys[index]]:
          result.status === 'rejected' ? undefined : result.value?.data?.url,
      }),
      {} as RequestSubmitOnboardingFormRequest,
    )
  }

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): RequestSubmitOnboardingFormRequest => {
    return {
      address: values.address,
      city: values.city,
      country: values.country,
      dateOfBirth: values.dateOfBirth,
      discordName: values.discordName,
      gender: values.gender,
      githubID: values.githubID,
      horoscope: values.horoscope,
      linkedInName: values.linkedInName,
      localBankBranch: values.localBankBranch,
      localBankCurrency: values.localBankCurrency,
      localBankNumber: values.localBankNumber,
      localBankRecipientName: values.localBankRecipientName,
      localBranchName: values.localBranchName,
      mbti: values.mbti,
      notionName: values.notionName,
      phoneNumber: values.phoneNumber,
      placeOfResidence: values.placeOfResidence,
    }
  }

  const handleUpload: (key: keyof UploadFiles) => UploadProps['onChange'] =
    (key) => (info) => {
      if (info.file.status === 'uploading') {
        setUploadFiles({
          [key]: { uploading: true },
        })
      } else if (info.file.status === 'done') {
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setUploadFiles({
            [key]: { url },
          })
        })
      }
    }

  const country = Form.useWatch('country', form)
  useEffect(() => {
    setFieldValue('city', undefined)
  }, [country, setFieldValue])

  return (
    <FormWrapper
      footer={
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          onClick={form.submit}
        >
          Submit
        </Button>
      }
    >
      <Form
        form={form}
        onFinish={(values) => {
          onCreateSubmit(values as RequestSubmitOnboardingFormRequest)
        }}
        scrollToFirstError={{
          behavior: (actions) => {
            actions.forEach(({ el, top }) => {
              const offsetTop = el.scrollTop > top ? -50 : 200
              el.scrollTop = top + offsetTop
            })
          },
        }}
      >
        <Row gutter={24}>
          <Col
            span={24}
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Basic Information
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <UploadImageItem
              label="ID Front"
              name="identityCardPhotoFront"
              uploadStatus={uploadFiles.identityCardPhotoFront}
              handleUpload={handleUpload}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <UploadImageItem
              label="ID Back"
              name="identityCardPhotoBack"
              uploadStatus={uploadFiles.identityCardPhotoBack}
              handleUpload={handleUpload}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <UploadImageItem
              label="Passport Front"
              name="passportPhotoFront"
              uploadStatus={uploadFiles.passportPhotoFront}
              handleUpload={handleUpload}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <UploadImageItem
              label="Passport Back"
              name="passportPhotoBack"
              uploadStatus={uploadFiles.passportPhotoBack}
              handleUpload={handleUpload}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter address" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Place Of Residence"
              name="placeOfResidence"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input
                className="bordered"
                placeholder="Enter place of residence"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getCountryMetadata()
                  setCountries(data || [])
                  return data?.map((each) => ({ label: each })) || []
                }}
                swrKeys={GET_PATHS.getCountryMetadata}
                placeholder="Select country"
                customOptionRenderer={renderCountryOption}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select placeholder="Select city" showSearch allowClear>
                {countries
                  .find((each) => each.id === country)
                  ?.cities?.map((key) => (
                    <Select.Option key={key} value={key} label={key}>
                      {key}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            Additional Information
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Date Of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select date of birth"
                className="bordered"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Horoscope"
              name="horoscope"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select placeholder="Select horoscope" showSearch allowClear>
                {horoscopeList.map((key) => (
                  <Select.Option key={key} value={key} label={key}>
                    {key}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select placeholder="Select gender" showSearch allowClear>
                {['Male', 'Female'].map((key) => (
                  <Select.Option key={key} value={key} label={key}>
                    {key}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="MBTI"
              name="mbti"
              rules={[{ required: true, message: 'Required' }]}
              tooltip={{
                title: (
                  <span>
                    Take your test{' '}
                    <a
                      href="https://www.16personalities.com/free-personality-test"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled"
                      style={{ color: 'white' }}
                    >
                      here
                    </a>
                  </span>
                ),
                icon: (
                  <span>
                    <InfoCircleOutlined />
                  </span>
                ),
              }}
            >
              <Input className="bordered" placeholder="Enter MBTI" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            Bank Information
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Bank Name"
              name="localBranchName"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter bank name" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Bank Branch"
              name="localBankBranch"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter bank branch" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Account Name"
              name="localBankRecipientName"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter account name" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Account Number"
              name="localBankNumber"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter account number" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Bank Currency"
              name="localBankCurrency"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input className="bordered" placeholder="Enter bank currency" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            Social Link
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Discord"
              name="discordName"
              rules={[{ required: true, message: 'Required' }]}
            >
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
        </Row>
      </Form>
    </FormWrapper>
  )
}