import { CloseOutlined } from '@ant-design/icons'
import { Divider, List, Modal, notification, Select, Tag, Tooltip } from 'antd'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { statusColors } from 'constants/colors'
import {
  PeerReviewServeyStatus,
  peerReviewServeyStatuses,
} from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ViewTopic } from 'types/schema'

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
  const { filter } = useFilter(new EmployeeListFilter())
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, filter],
    () => client.getEmployees(filter),
  )
  const employees = data?.data || []

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

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
    setValue('')
    const newParticipant = employees.find((each) => each.id === data)
    if (newParticipant && !participants.some((each) => each.id === data)) {
      setParticipants((participants) => [...participants, newParticipant])
    }
  }

  const onChange = (data: string) => {
    setValue(data)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        setParticipants([...(topic.participants || [])])
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
        style={{ width: '100%' }}
        filterOption={false}
        defaultActiveFirstOption={false}
        loading={loading}
        options={employees.map((each) => ({
          value: each.id,
          label: <AvatarWithName user={each} isLink={false} />,
          disabled: participants.some(
            (participant) => participant.id === each.id,
          ),
        }))}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
      />
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={participants}
        split={false}
        style={{ maxHeight: '50vh', overflowY: 'auto' }}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <div style={{ minWidth: 60 }}>
                {index < 2 ? (
                  <Tag
                    color={
                      statusColors[
                        index === 0
                          ? PeerReviewServeyStatus.DONE
                          : PeerReviewServeyStatus.SENT
                      ]
                    }
                    style={{ margin: 0 }}
                  >
                    {
                      peerReviewServeyStatuses[
                        index === 0
                          ? PeerReviewServeyStatus.DONE
                          : PeerReviewServeyStatus.SENT
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
