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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import debounce from 'lodash.debounce'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  setProjectsToSend: Dispatch<SetStateAction<string[]>>
}

export const ToggleSendSurveysModal = (props: Props) => {
  const { isOpen, onClose, setProjectsToSend } = props

  const { data: projectsData } = useFetchWithCache(
    [GET_PATHS.getProjects],
    () => client.getProjects(new ProjectListFilter()),
  )

  const [checkedList, defaultSetCheckedList] = useState<boolean[]>([])

  useEffect(() => {
    defaultSetCheckedList(
      new Array((projectsData?.data || []).length).fill(true),
    )
  }, [projectsData])

  useEffect(() => {
    const checkedProjectIds: string[] = []

    checkedList.forEach((checked, id) => {
      if (checked && projectsData?.data) {
        checkedProjectIds.push(projectsData?.data[id].id!)
      }
    })

    setProjectsToSend(checkedProjectIds)
  }, [checkedList, projectsData, setProjectsToSend])

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
    if (!(projectsData?.data || []).length) {
      return <Empty description="No projects data" />
    }
    if (!searchQuery) {
      return (projectsData?.data || []).map((d, i) => (
        <Col
          key={i}
          span={24}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <Typography.Text>{d?.name || '-'}</Typography.Text>
          <Switch
            checked={checkedList[i]}
            onChange={() => toggleCheckedList(i)}
          />
        </Col>
      ))
    }
    if (
      (projectsData?.data || []).find((d) =>
        (d?.name || '-').toLowerCase().includes(searchQuery.toLowerCase()),
      )
    ) {
      return (projectsData?.data || [])
        .filter((d) =>
          (d?.name || '-').toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Typography.Text>{d?.name || '-'}</Typography.Text>
            <Switch
              checked={checkedList[i]}
              onChange={() => toggleCheckedList(i)}
            />
          </Col>
        ))
    }
    return <Empty description={`No projects for keyword "${searchQuery}"`} />
  }, [checkedList, projectsData, searchQuery, toggleCheckedList])

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Setting"
      style={{ maxWidth: 450 }}
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
        style={{ width: '100%', height: 400, overflowY: 'auto' }}
      >
        {renderProjects}
      </Space>
    </Modal>
  )
}
