import { Form, Radio, FormItemProps } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { agreementLevels } from 'constants/agreementLevel'
import { levelsColors } from 'constants/colors'
import { FeedbackQuestionType } from 'constants/feedbackTypes'

type Props = FormItemProps & {
  type: FeedbackQuestionType
  showNote: boolean
  done?: boolean
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
              {(
                Object.keys(agreementLevels) as Array<
                  keyof typeof agreementLevels
                >
              ).map((item) => (
                <Radio.Button
                  value={item}
                  key={item}
                  disabled={done}
                  style={{
                    display: 'flex',
                    height: '100%',
                    lineHeight: 1,
                    padding: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: levelsColors[item].background,
                    color: levelsColors[item].text,
                    borderRadius: '5px',
                    borderWidth: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    overflow: 'hidden',
                  }}
                >
                  {agreementLevels[item]}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          {showNote && (
            <Form.Item name={`${name}_notes`}>
              {/* @ts-ignore */}
              <TextArea
                rows={3}
                bordered
                placeholder="Enter your message"
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
