import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Col, Form, Row, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from 'components/common/Button'
import { ItemIndex } from 'components/common/ItemIndex'
import { PageHeader } from 'components/common/PageHeader'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { PeerPerformanceReviewModal } from './PeerPerformanceReviewModal'

const mockData = [
  {
    question: 'Does this employee effectively communicate with others?',
    type: 'textarea',
    name: '1',
  },
  {
    question:
      'How effective of a leader is this person, either through direct management or influence?',
    type: 'textarea',
    name: '2',
  },
  {
    question:
      'Does this person find creative solutions, and own the solution to problems? Are they proactive or reactive?',
    type: 'textarea',
    name: '3',
  },
  {
    question: "How would you rate the quality of the employee's work?",
    type: 'textarea',
    name: '4',
  },
  {
    question: 'How well does this person set and meet deadlines?',
    type: 'textarea',
    name: '5',
  },
  {
    question: 'How well does this person embody our culture?',
    type: 'textarea',
    name: '6',
  },
  {
    question:
      'If you could give this person one piece of constructive advice to make them more effective in their role, what would you say?',
    type: 'textarea',
    name: '7',
  },
]

const Field = (props: any) => {
  const { type, ...rest } = props

  switch (type) {
    case 'textarea': {
      return <TextArea {...rest} rows={3} bordered />
    }
    default: {
      return null
    }
  }
}

export const PeerFormanceReviewForm = () => {
  const { push } = useRouter()

  const [form] = useForm()
  const submitAction = useRef('')
  const [submittedValues, setSubmittedValues] = useState()

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
    <>
      <Space style={{ width: '100%' }} size={24} direction="vertical">
        <PageHeader
          title="Peer Performance Review Q1/Q2 2022 - John Doe"
          backHref={ROUTES.INBOX}
        />
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
                  {mockData.map((field, index) => {
                    return (
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
                            rules={[{ required: true }]}
                          >
                            <Field {...field} />
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  })}
                </Space>
              </Form>
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
      </Space>
      {isPreviewDialogOpen && (
        <PeerPerformanceReviewModal
          data={mockData}
          values={submittedValues}
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          onOk={onSend}
        />
      )}
    </>
  )
}
