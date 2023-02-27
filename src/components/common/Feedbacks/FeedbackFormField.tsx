import { Form, Radio, FormItemProps } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { AgreementLevel } from 'constants/agreementLevel'
import { DomainTypes, FeedbackQuestionType } from 'constants/feedbackTypes'
import { workSurveys } from 'constants/workSurveys'

type Props = FormItemProps & {
  type: FeedbackQuestionType
  showNote: boolean
  done?: boolean
  domain?: DomainTypes
} & Record<string, any>

export const FeedbackFormField = (props: Props) => {
  const {
    type,
    label,
    name,
    rules,
    showNote = false,
    required = false,
    done = false,
    domain = 'engagement',
    ...rest
  } = props

  switch (type) {
    case FeedbackQuestionType.GENERAL: {
      return (
        <Form.Item
          label={label}
          name={name}
          required={required}
          rules={[{ required, message: 'Required' }]}
        >
          {/* @ts-ignore */}
          <TextArea {...rest} rows={3} bordered readOnly={done} />
        </Form.Item>
      )
    }
    case FeedbackQuestionType.LIKERT_SCALE: {
      return (
        <>
          <Form.Item
            label={label}
            name={name}
            required={required}
            rules={[
              {
                required,
                message: 'Required',
              },
            ]}
          >
            <Radio.Group
              className="likert-scale"
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '5px',
                textAlign: 'center',
              }}
            >
              {(Object.keys(workSurveys[domain]) as Array<AgreementLevel>).map(
                (item) => (
                  <Radio.Button value={item} key={item} disabled={done}>
                    {workSurveys[domain][item].name}
                  </Radio.Button>
                ),
              )}
            </Radio.Group>
          </Form.Item>
          {showNote && (
            <Form.Item name={`${name}_notes`}>
              {/* @ts-ignore */}
              <TextArea
                rows={4}
                className="bordered"
                placeholder="Tell us more about this"
                readOnly={done}
                {...rest}
              />
            </Form.Item>
          )}
        </>
      )
    }
    default: {
      return null
    }
  }
}
