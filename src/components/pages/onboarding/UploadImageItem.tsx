import { Form, Row, Upload, UploadProps, Avatar, Spin, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { beforeUpload } from 'utils/uploadFile'
import { Rule } from 'antd/lib/form'

export interface UploadStatus {
  uploading?: boolean
  url?: string
}

export interface UploadFiles {
  identityCardPhotoFront?: UploadStatus
  identityCardPhotoBack?: UploadStatus
  passportPhotoFront?: UploadStatus
  passportPhotoBack?: UploadStatus
}

interface Props {
  label: string
  name: keyof UploadFiles
  rules?: Rule[]
  uploadStatus?: UploadStatus
  handleUpload: (key: keyof UploadFiles) => UploadProps['onChange']
}

export const UploadImageItem = ({
  label,
  name,
  rules,
  uploadStatus,
  handleUpload,
}: Props) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        accept="image/png, image/jpeg"
        beforeUpload={beforeUpload}
        onChange={handleUpload(name)}
        className="custom-upload"
        style={{ height: 100 }}
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
              uploadStatus?.url && (
                <Image
                  src={uploadStatus.url}
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
    </Form.Item>
  )
}
