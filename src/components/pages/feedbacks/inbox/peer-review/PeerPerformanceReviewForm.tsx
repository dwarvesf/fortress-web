import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Col, Form, Row, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { PeerPerformanceReviewPreviewModal } from './PeerPerformanceReviewPreviewModal'

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

const FieldIndex = styled.div`
  margin-top: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgba(225, 63, 94, 0.3);
  background-opacity: 0.1;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`

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
              <Form form={form} onFinish={onSubmit}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {mockData.map((field, index) => {
                    return (
                      <Row key={index} gutter={24} wrap={false}>
                        <Col>
                          <FieldIndex>{index + 1}</FieldIndex>
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
        <PeerPerformanceReviewPreviewModal
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
