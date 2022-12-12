import { Col, Divider, Modal, Space, Switch, Typography } from 'antd'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const mockSendSurveyData = [
  { projectName: 'Fortress', checked: true },
  { projectName: 'SP Digital', checked: false },
  { projectName: 'Setel', checked: true },
  { projectName: 'Droppii', checked: true },
  { projectName: 'Konvoy', checked: true },
]

export const ToggleSendSurveysModal = (props: Props) => {
  const { isOpen, onClose } = props

  const [checkedList, defaultSetCheckedList] = useState<boolean[]>(
    mockSendSurveyData.map((d) => d.checked),
  )

  const setCheckedList = (index: number) => {
    const newCheckedList: boolean[] = []

    checkedList.forEach((c, i) => {
      newCheckedList.push(i === index ? !c : c)
    })

    defaultSetCheckedList(newCheckedList)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Setting"
      style={{ maxWidth: 350 }}
    >
      <Space
        direction="vertical"
        split={<Divider style={{ marginTop: 12, marginBottom: 12 }} />}
        style={{ width: '100%', maxHeight: 350, overflowY: 'auto' }}
      >
        {mockSendSurveyData.map((d, i) => (
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Typography.Text>{d.projectName}</Typography.Text>
            <Switch
              checked={checkedList[i]}
              onChange={() => setCheckedList(i)}
            />
          </Col>
        ))}
      </Space>
    </Modal>
  )
}
