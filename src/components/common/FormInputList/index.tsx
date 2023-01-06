import { DeleteOne, Plus } from '@icon-park/react'
import { Form, FormInstance, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import { HTMLAttributes, InputHTMLAttributes, useEffect } from 'react'
import { Button } from '../Button'

interface Props {
  form: FormInstance
  name: string | number | (string | number)[]
  label?: string
  rules?: Rule[]
  removeButtonProps?: HTMLAttributes<HTMLButtonElement>
  addButtonProps?: HTMLAttributes<HTMLButtonElement>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const FormInputList = (props: Props) => {
  const {
    form,
    name,
    label,
    rules,
    removeButtonProps: _removeButtonProps = {},
    addButtonProps: _addButtonProps = {},
    inputProps,
  } = props
  const {
    onClick: onRemove,
    style: removeButtonStyle,
    ...removeButtonProps
  } = _removeButtonProps
  const {
    onClick: onAdd,
    children: addButtonChildren = 'Add',
    style: addButtonStyle,
    ...addButtonProps
  } = _addButtonProps
  const { getFieldValue, setFieldValue } = form

  useEffect(() => {
    if (!getFieldValue(name)?.length) {
      setFieldValue(name, [''])
    }
  }, [getFieldValue, name, setFieldValue])

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <div
              key={field.key}
              style={{ marginBottom: 10, position: 'relative' }}
            >
              <Form.Item
                {...field}
                label={index === 0 && label}
                rules={rules}
                style={{ marginBottom: 0 }}
              >
                <Input className="bordered" {...inputProps} />
              </Form.Item>
              {index > 0 && (
                <Button
                  type="text-primary"
                  size="small"
                  icon={<DeleteOne size={20} />}
                  onClick={() => remove(index)}
                  {...removeButtonProps}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 5,
                    ...removeButtonStyle,
                  }}
                />
              )}
            </div>
          ))}
          <Button
            block
            type="ghost"
            onClick={() => add()}
            icon={<Plus size={20} />}
            style={{ marginBottom: 24, ...addButtonStyle }}
            {...addButtonProps}
          >
            {addButtonChildren}
          </Button>
        </>
      )}
    </Form.List>
  )
}
