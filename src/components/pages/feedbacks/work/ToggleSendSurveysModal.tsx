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
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { useFilter } from 'hooks/useFilter'
import { ViewProjectData } from 'types/schema'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ToggleSendSurveysModal = (props: Props) => {
  const { isOpen, onClose } = props
  const { filter } = useFilter(
    new ProjectListFilter({ sort: '-start_date, -name' }),
  )

  const { data: projectsData, mutate } = useFetchWithCache(
    [
      GET_PATHS.getProjects,
      'toggle-projects-to-send-survey',
      JSON.stringify(filter),
    ],
    () => client.getProjects(filter),
  )

  const [searchQuery, setSearchQuery] = useState<string>('')
  const projectsList = useMemo(() => projectsData?.data || [], [projectsData])

  const checkedList = useMemo(() => {
    return projectsList.map((d) => d.allowsSendingSurvey || false)
  }, [projectsList])

  const renderSwitch = useCallback(
    (d: ViewProjectData, index: number) => {
      return (
        <Switch
          checked={checkedList[index]}
          onChange={async (checked) => {
            await client
              .updateProjectsSendSurveyStatus(d.id!, checked)
              .then(() => mutate())
          }}
          style={{ margin: 8 }}
        />
      )
    },
    [checkedList, mutate],
  )

  const renderProjects = useMemo(() => {
    if (projectsList.length === 0) {
      return <Empty description="No projects data" />
    }
    if (!searchQuery) {
      return projectsList.map((d, i) => (
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
          {renderSwitch(d, i)}
        </Col>
      ))
    }
    if (
      projectsList.find((d) =>
        (d?.name || '-').toLowerCase().includes(searchQuery.toLowerCase()),
      )
    ) {
      return projectsList
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
            {renderSwitch(d, i)}
          </Col>
        ))
    }
    return <Empty description={`No projects for keyword "${searchQuery}"`} />
  }, [projectsList, renderSwitch, searchQuery])

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
        style={{ width: '100%', height: 400, overflowY: 'auto', gap: 0 }}
      >
        {renderProjects}
      </Space>
    </Modal>
  )
}
