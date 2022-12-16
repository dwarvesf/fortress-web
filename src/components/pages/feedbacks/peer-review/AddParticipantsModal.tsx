import { CloseOutlined } from '@ant-design/icons'
import { Divider, List, Modal, notification, Select, Tag, Tooltip } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { statusColors } from 'constants/colors'
import {
  EmployeeStatus,
  SurveyParticipantStatus,
  peerReviewSurveyStatuses,
} from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ViewTopic } from 'types/schema'
import debounce from 'lodash.debounce'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAfterSubmit: () => void
  topic: ViewTopic
}

export const AddParticipantsModal = (props: Props) => {
  const { isOpen, onClose, onAfterSubmit, topic } = props
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [participants, setParticipants] = useState([
    ...(topic.participants || []),
  ])
  const [value, setValue] = useState('')
  const { filter, setFilter } = useFilter(
    new EmployeeListFilter({
      workingStatus: [EmployeeStatus.FULLTIME],
    }),
  )
  const { data: employeeData, loading: employeeLoading } = useFetchWithCache(
    [GET_PATHS.getEmployees, filter],
    () => client.getEmployees({ ...filter, size: 1000 }),
  )
  const employees = employeeData?.data || []
  const { data: topicData, loading: topicLoading } = useFetchWithCache(
    [
      GET_PATHS.getSurveyTopic(topic.eventID!, topic.id!),
      topic.eventID,
      topic.id,
    ],
    () => client.getSurveyTopic(topic.eventID!, topic.id!),
  )
  const participantStatuses =
    topicData?.data?.participants?.reduce<{
      [id: string]: string | undefined
    }>((pre, cur) => ({ ...pre, [cur.reviewer?.id!]: cur.status }), {}) || {}

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      await client.updateSurveyReviewers(topic.eventID!, topic.id!, {
        reviewerIDs: participants.map((each) => each.id!),
      })

      notification.success({
        message: 'Participants edited successfully!',
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not edit participants',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSelect = (data: string) => {
    setValue(filter.keyword || '')
    const newParticipant = employees.find((each) => each.id === data)
    if (newParticipant && !participants.some((each) => each.id === data)) {
      setParticipants((participants) => [...participants, newParticipant])
    }
  }

  const onSearch = debounce((data: string) => {
    setValue(data)
    setFilter({ keyword: data })
  }, 500)

  const onClear = () => {
    setValue('')
    setFilter({ keyword: '' })
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
      }}
      onOk={onSubmit}
      okText="Save"
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Add participants"
    >
      <Select
        placeholder="Search and hit enter to add..."
        bordered
        showSearch
        allowClear
        onClear={onClear}
        style={{ width: '100%' }}
        defaultActiveFirstOption={false}
        loading={employeeLoading}
        filterOption={false}
        options={employees.map((each) => ({
          value: each.id,
          label: <AvatarWithName user={each} isLink={false} />,
          disabled: participants.some(
            (participant) => participant.id === each.id,
          ),
        }))}
        value={value}
        onSelect={onSelect}
        onSearch={onSearch}
      />
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={participants}
        loading={topicLoading}
        split={false}
        style={{ maxHeight: '50vh', overflowY: 'auto' }}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <div style={{ minWidth: 60 }}>
                {[
                  SurveyParticipantStatus.DONE,
                  SurveyParticipantStatus.SENT,
                ].includes(
                  participantStatuses[item.id!] as SurveyParticipantStatus,
                ) ? (
                  <Tag
                    color={
                      statusColors[participantStatuses[item.id!] as string]
                    }
                    style={{ margin: 0 }}
                  >
                    {
                      peerReviewSurveyStatuses[
                        participantStatuses[item.id!] as SurveyParticipantStatus
                      ]
                    }
                  </Tag>
                ) : (
                  <Tooltip title="Delete">
                    <Button
                      type="text-primary"
                      size="small"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        setParticipants((participants) =>
                          participants.filter((_, i) => i !== index),
                        )
                      }}
                    />
                  </Tooltip>
                )}
              </div>,
            ]}
          >
            <AvatarWithName user={item} />
          </List.Item>
        )}
      />
    </Modal>
  )
}
