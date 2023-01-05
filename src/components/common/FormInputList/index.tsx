import { DeleteOne, Plus } from '@icon-park/react'
import { Form, FormInstance } from 'antd'
import { Rule } from 'antd/lib/form'
import { HTMLAttributes, useEffect } from 'react'
import { WithChildren } from 'types/common'
import { Button } from '../Button'

interface Props extends WithChildren {
  form: FormInstance
  name: string | number | (string | number)[]
  label?: string
  rules?: Rule[]
  removeButtonProps?: HTMLAttributes<HTMLButtonElement>
  addButtonProps?: HTMLAttributes<HTMLButtonElement>
}

export const FormInputList = (props: Props) => {
  const {
    form,
    name,
    label,
    rules,
    children,
    removeButtonProps: _removeButtonProps = {},
    addButtonProps: _addButtonProps = {},
  } = props
  const {
    onClick: onRemove,
    style: removeButtonStyle,
    ...removeButtonProps
  } = _removeButtonProps
  const {
    onClick: onAdd,
    children: addButtonChildren = 'Add',
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
                {children}
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
            {...addButtonProps}
          >
            {addButtonChildren}
          </Button>
        </>
      )}
    </Form.List>
  )
}
