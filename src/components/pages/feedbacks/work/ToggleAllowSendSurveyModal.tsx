import {
  Col,
  Empty,
  Input,
  Modal,
  notification,
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
import { getErrorMessage } from 'utils/string'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ToggleAllowSendSurveyModal = (props: Props) => {
  const { isOpen, onClose } = props
  const { filter } = useFilter(
    new ProjectListFilter({ sort: '-start_date, -name', status: 'active' }),
  )

  const { data: projectsData, mutate } = useFetchWithCache(
    [GET_PATHS.getProjects, JSON.stringify(filter)],
    () => client.getProjects(filter),
  )

  const [searchQuery, setSearchQuery] = useState<string>('')
  const projectsList = useMemo(() => projectsData?.data || [], [projectsData])

  const sendSurveyStatusList = useMemo(() => {
    return projectsList.map((d) => d.allowsSendingSurvey || false)
  }, [projectsList])

  const renderSwitch = useCallback(
    (d: ViewProjectData, index: number) => {
      return (
        <Switch
          checked={sendSurveyStatusList[index]}
          onChange={async (checked) => {
            try {
              await client.updateProjectsSendSurveyStatus(d.id!, checked)

              notification.success({
                message: `Survey config of ${
                  d?.name || 'this project'
                } updated successfully!`,
              })

              mutate()
            } catch (error: any) {
              notification.error({
                message: getErrorMessage(
                  error,
                  `Could not update survey config of ${
                    d?.name || 'this project'
                  }`,
                ),
              })
            }
          }}
        />
      )
    },
    [sendSurveyStatusList, mutate],
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
        style={{ width: '100%', height: 400, overflowY: 'auto', gap: 0 }}
        size={16}
      >
        {renderProjects}
      </Space>
    </Modal>
  )
}
