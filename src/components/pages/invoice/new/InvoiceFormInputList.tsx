import { Icon } from '@iconify/react'
import { Col, Form, FormInstance, Input, InputProps, Row } from 'antd'
import { Rule } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import { HTMLAttributes, useEffect } from 'react'
import { Button } from '../../../common/Button'

interface Props {
  form: FormInstance
  name: string | number | (string | number)[]
  label?: string
  rules?: Rule[]
  removeButtonProps?: HTMLAttributes<HTMLButtonElement>
  addButtonProps?: HTMLAttributes<HTMLButtonElement>
  inputProps?: InputProps
}

export const InvoiceFormInputList = (props: Props) => {
  const {
    form,
    name,
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
    <>
      <div
        style={{
          overflow: 'auto',
        }}
      >
        <Form.List name={name}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Row
                  key={field.key}
                  style={{
                    marginBottom: 10,
                    position: 'relative',
                    minWidth: 640,
                    overflow: 'auto',
                  }}
                  gutter={[24, 24]}
                >
                  <Col span={8}>
                    <Form.Item
                      name={[index, 'description']}
                      label={index === 0 && 'Description'}
                      rules={rules}
                      style={{ marginTop: 8, marginBottom: 8 }}
                    >
                      <TextArea
                        className="bordered"
                        placeholder="Enter description"
                        rows={1}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      name={[index, 'quantity']}
                      label={index === 0 && 'Quantity'}
                      rules={rules}
                      style={{ marginTop: 8, marginBottom: 8 }}
                    >
                      <Input
                        className="bordered"
                        type="number"
                        placeholder="Enter quantity"
                        {...inputProps}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      name={[index, 'unit-price']}
                      label={index === 0 && 'Unit price'}
                      rules={rules}
                      style={{ marginTop: 8, marginBottom: 8 }}
                    >
                      <Input
                        className="bordered"
                        type="number"
                        placeholder="Enter unit price"
                        prefix="$"
                        {...inputProps}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      name={[index, 'discount']}
                      label={index === 0 && 'Discount'}
                      rules={rules}
                      style={{ marginTop: 8, marginBottom: 8 }}
                    >
                      <Input
                        className="bordered"
                        type="number"
                        placeholder="Enter discount"
                        prefix="%"
                        style={{}}
                        {...inputProps}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={index > 0 ? 3 : 4}>
                    <Form.Item
                      name={[index, 'cost']}
                      label={index === 0 && 'Cost'}
                      rules={rules}
                      style={{ marginTop: 8, marginBottom: 8 }}
                    >
                      <Input
                        className="bordered"
                        type="number"
                        placeholder="Enter cost"
                        {...inputProps}
                      />
                    </Form.Item>
                  </Col>
                  {index > 0 && (
                    <Col span={1}>
                      <Button
                        type="text-primary"
                        size="small"
                        icon={
                          <Icon
                            icon="icon-park-outline:delete-one"
                            width={20}
                          />
                        }
                        onClick={() => remove(index)}
                        {...removeButtonProps}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 5,
                          ...removeButtonStyle,
                        }}
                      />
                    </Col>
                  )}
                </Row>
              ))}
              <Button
                block
                type="ghost"
                onClick={() => add()}
                icon={<Icon icon="icon-park-outline:plus" width={20} />}
                style={{
                  marginBottom: 24,
                  position: 'sticky',
                  left: 0,
                  width: 'max-content',
                  ...addButtonStyle,
                }}
                {...addButtonProps}
              >
                {addButtonChildren}
              </Button>
            </>
          )}
        </Form.List>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div>Subtotal: $ 8,000</div>
        <div>Total: $ 8,000</div>
      </div>
    </>
  )
}
