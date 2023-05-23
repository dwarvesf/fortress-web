import { Form, Row, Upload, UploadProps, Avatar, Spin, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { beforeUpload } from 'utils/uploadFile'
import { FormInstance, Rule } from 'antd/lib/form'
import { useState } from 'react'
import classNames from 'classnames'

export interface UploadStatus {
  uploading?: boolean
  url?: string
}

export interface UploadFiles {
  identityCardPhotoFront?: UploadStatus
  identityCardPhotoBack?: UploadStatus
  passportPhotoFront?: UploadStatus
  passportPhotoBack?: UploadStatus
  avatar?: UploadStatus
}

interface Props {
  label: string
  name: keyof UploadFiles
  rules?: Rule[]
  uploadStatus?: UploadStatus
  handleUpload: (key: keyof UploadFiles) => UploadProps['onChange']
  defaultValue?: string
  form?: FormInstance
}

export const UploadImageItem = ({
  label,
  name,
  rules,
  uploadStatus,
  handleUpload,
  defaultValue,
  form,
}: Props) => {
  const [height, setHeight] = useState<number>()
  const value = Form.useWatch(name, form)

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <div
        style={
          name === 'avatar'
            ? {
                height,
                width: '50%',
                maxWidth: 200,
                margin: 'auto',
              }
            : { height }
        }
        ref={(ref) => {
          if (ref) {
            setHeight(
              name === 'avatar' ? ref.clientWidth : (ref.clientWidth * 3) / 4,
            )
          }
        }}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          accept="image/png, image/jpeg"
          beforeUpload={beforeUpload}
          onChange={handleUpload(name)}
          className={classNames('custom-upload', {
            'custom-upload-circle': name === 'avatar',
          })}
          fileList={value?.fileList || []}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.('ok')
            }, 0)
          }}
        >
          <Avatar
            src={
              uploadStatus?.uploading ? (
                <Row
                  align="middle"
                  justify="center"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Spin size="large" style={{ color: 'red' }} />
                </Row>
              ) : (
                (uploadStatus?.url || defaultValue) && (
                  <Image
                    src={uploadStatus?.url || defaultValue}
                    height="100%"
                    width="100%"
                    style={{ objectFit: 'cover' }}
                    preview={false}
                  />
                )
              )
            }
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 0,
              userSelect: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'grid' }}>
              <PlusOutlined style={{ fontSize: 22 }} />
              <div>Upload image</div>
            </div>
          </Avatar>
        </Upload>
      </div>
    </Form.Item>
  )
}
