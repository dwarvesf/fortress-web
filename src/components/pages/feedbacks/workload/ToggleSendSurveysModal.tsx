import {
  Col,
  Divider,
  Empty,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd'
import { useCallback, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

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

  const [searchQuery, setSearchQuery] = useState('')

  const toggleCheckedList = useCallback(
    (index: number) => {
      const newCheckedList: boolean[] = []

      checkedList.forEach((c, i) => {
        newCheckedList.push(i === index ? !c : c)
      })

      defaultSetCheckedList(newCheckedList)
    },
    [checkedList],
  )

  const renderProjects = useMemo(() => {
    if (!mockSendSurveyData.length) {
      return <Empty description="No projects data" />
    }
    if (!searchQuery) {
      return mockSendSurveyData.map((d, i) => (
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
            onChange={() => toggleCheckedList(i)}
          />
        </Col>
      ))
    }
    if (
      mockSendSurveyData.find((d) =>
        d.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    ) {
      return mockSendSurveyData
        .filter((d) =>
          d.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((d, i) => (
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
              onChange={() => toggleCheckedList(i)}
            />
          </Col>
        ))
    }
    return <Empty description={`No projects for keyword "${searchQuery}"`} />
  }, [checkedList, searchQuery, toggleCheckedList])

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Setting"
      style={{ maxWidth: 350 }}
    >
      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Input
            className="bordered"
            placeholder="Search projects"
            onChange={debounce(
              (event) => setSearchQuery(event.target.value),
              500,
            )}
          />
        </Col>
      </Row>
      <Space
        direction="vertical"
        split={<Divider style={{ marginTop: 12, marginBottom: 12 }} />}
        style={{ width: '100%', height: 250, overflowY: 'auto' }}
      >
        {renderProjects}
      </Space>
    </Modal>
  )
}
