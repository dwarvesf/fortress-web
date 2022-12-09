import { List, Modal, Tag } from 'antd'
import { AgreementLevel, agreementLevels } from 'constants/agreementLevel'
import { statusColors } from 'constants/colors'
import { ItemIndex } from '../../../../common/ItemIndex'

interface Props {
  isOpen: boolean
  values: any
  data: { question: string; name: string }[]
  onCancel: () => void
  onOk: () => void
}

export const EngagementSurveyPreviewModal = (props: Props) => {
  const { isOpen, values = {}, data = [], onCancel, onOk } = props

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      okText="Send"
      onOk={onOk}
      width={768}
      title="John Doe, SP Digital"
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item style={{ alignItems: 'start' }}>
            <List.Item.Meta
              avatar={<ItemIndex active>{index + 1}</ItemIndex>}
              title={<strong>{item.question}</strong>}
              description={values[`${item.name}_message`]}
            />
            <Tag
              color={statusColors[values[item.name]]}
              style={{ minWidth: 110, textAlign: 'center' }}
            >
              {agreementLevels[values[item.name] as AgreementLevel]}
            </Tag>
          </List.Item>
        )}
      />
    </Modal>
  )
}
