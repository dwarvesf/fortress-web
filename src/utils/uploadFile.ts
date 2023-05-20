import { notification } from 'antd'
import { RcFile } from 'antd/lib/upload'

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    notification.error({
      message: 'You can only upload JPG/PNG file!',
    })
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    notification.error({
      message: 'Image must smaller than 2MB!',
    })
  }
  return isJpgOrPng && isLt2M
}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
