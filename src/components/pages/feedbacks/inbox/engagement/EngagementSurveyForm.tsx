import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Col, Form, Radio, Row, Space, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'
import { agreementLevels } from 'constants/agreementLevel'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { EngagementSurveyPreviewModal } from './EngagementSurveyPreviewModal'
import { ItemIndex } from '../../../../common/ItemIndex'

const mockData = [
  {
    question: 'I know what is expected of me at work.',
    name: 'question_1',
  },
  {
    question: 'I have the materials and equipment I need to do my work right.',
    name: 'question_2',
  },
  {
    question: 'At work, I have the opportunity to do what I do best every day.',
    name: 'question_3',
  },
  {
    question:
      'In the last seven days, I have received recognition or praise for doing good work.',
    name: 'question_4',
  },
  {
    question:
      'My supervisor, or someone at work, seems to care about me as a person.',
    name: 'question_5',
  },
  {
    question: 'There is someone at work who encourages my development.',
    name: 'question_6',
  },
  {
    question: 'At work, my opinions seem to count.',
    name: 'question_7',
  },
  {
    question:
      'The mission or purpose of my company makes me feel my job is important.',
    name: 'question_8',
  },
  {
    question:
      'My associates or fellow employees are committed to doing quality work.',
    name: 'question_9',
  },
  {
    question: 'I have a best friend at work.',
    name: 'question_10',
  },
  {
    question:
      'In the last six months, someone at work has talked to me about my progress.',
    name: 'question_11',
  },
  {
    question:
      'This last year, I have had opportunities at work to learn and grow.',
    name: 'question_12',
  },
]

const buttonColor = {
  'strongly-disagree': { background: '#ff4d4f', text: 'white' },
  disagree: { background: '#ffd666', text: 'black' },
  mixed: { background: '#788896', text: 'white' },
  agree: { background: '#597ef7', text: 'white' },
  'strongly-agree': { background: '#1aae9f', text: 'white' },
}

export const EngagementSurveyForm = () => {
  const { push } = useRouter()
  const [form] = useForm()
  const submitAction = useRef('')
  const [submittedValues, setSubmittedValues] = useState()
  const [showNote, setShowNite] = useState(true)

  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()

  const onSubmit = async (values: any) => {
    setSubmittedValues({ ...values })

    if (submitAction.current === 'preview') {
      console.log('Preview')
      openPreviewDialog()
    } else if (submitAction.current === 'save-draft') {
      console.log('Save draft!')
    }
  }

  const onPreview = () => {
    submitAction.current = 'preview'
    form.submit()
  }

  const onSaveDraft = () => {
    submitAction.current = 'save-draft'
    form.submit()
  }

  const onSend = () => {
    push(ROUTES.INBOX)
  }

  return (
    <Space style={{ width: '100%' }} size={24} direction="vertical">
      <PageHeader title="Engagement Survey Q1/2022" backHref={ROUTES.INBOX} />
      <Row>
        <Col lg={{ span: 16 }}>
          <Card>
            <Form
              form={form}
              onFinish={onSubmit}
              onValuesChange={(_, values) => {
                setSubmittedValues({ ...values })
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {mockData.map((field, index) => (
                  <Row key={index} gutter={24} wrap={false}>
                    <Col
                      style={{
                        height: 40,
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <ItemIndex active={submittedValues?.[field.name]}>
                        {index + 1}
                      </ItemIndex>
                    </Col>
                    <Col flex={1}>
                      <Form.Item
                        label={field.question}
                        name={field.name}
                        required
                        rules={[
                          {
                            required: true,
                            message: 'This question is required',
                          },
                        ]}
                      >
                        <Radio.Group
                          style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '5px',
                            textAlign: 'center',
                          }}
                        >
                          {(
                            Object.keys(agreementLevels) as Array<
                              keyof typeof agreementLevels
                            >
                          ).map((item) => (
                            <Radio.Button
                              value={item}
                              key={item}
                              style={{
                                display: 'flex',
                                height: '100%',
                                lineHeight: 1,
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: buttonColor[item].background,
                                color: buttonColor[item].text,
                                borderRadius: '5px',
                                borderWidth: 0,
                                fontSize: 12,
                                fontWeight: 700,
                                overflow: 'hidden',
                                opacity:
                                  submittedValues?.[field.name] === item
                                    ? 1
                                    : 0.3,
                              }}
                            >
                              {agreementLevels[item]}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                      {showNote && (
                        <Form.Item name={`${field.name}_message`}>
                          <TextArea
                            rows={3}
                            bordered
                            placeholder="Enter your message"
                          />
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                ))}
              </Space>
            </Form>
            <Space>
              <Switch
                checked={showNote}
                onChange={(checked) => setShowNite(checked)}
              />
              <span>Show note</span>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col>
          <Button type="default" onClick={onSaveDraft}>
            Save Draft
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={onPreview}>
            Preview & Send
          </Button>
        </Col>
      </Row>

      <EngagementSurveyPreviewModal
        data={mockData}
        values={submittedValues}
        isOpen={isPreviewDialogOpen}
        onCancel={closePreviewDialog}
        onOk={onSend}
      />
    </Space>
  )
}
