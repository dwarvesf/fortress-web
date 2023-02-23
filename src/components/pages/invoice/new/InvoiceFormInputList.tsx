import { Icon } from '@iconify/react'
import { Form, FormInstance, Input, InputProps } from 'antd'
import { Rule } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import { HTMLAttributes, useEffect } from 'react'
import styled from 'styled-components'
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

const TableWrapper = styled.div`
  overflow: auto;

  .ant-form-item {
    margin-bottom: 0;
  }

  table {
    width: 100%;
    min-width: 640px !important;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 12px;
  }

  tr {
    th {
      padding: 12px;
      word-wrap: normal;
      text-transform: uppercase;
      color: #8f8f8f;
      font-weight: bold;
      font-size: 80%;
      background-color: white;

      &::before {
        display: none !important;
      }

      &:nth-of-type(2n) {
        background-color: #fcfcfc !important;
      }
    }
  }

  tr {
    td {
      padding: 12px;
      border-top: 1px solid #f0f0f0;

      &:nth-of-type(2n + 1) {
        background-color: white;
      }

      &:nth-of-type(2n) {
        background-color: #fcfcfc;
      }

      &.ant-table-cell-row-hover {
        background-color: rgb(252, 249, 248);
        cursor: pointer;
      }

      &:first-of-type {
        padding-left: 0 !important;
      }

      &:nth-last-of-type(1) {
        padding-right: 0 !important;
      }
    }
  }
`

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
              <TableWrapper>
                <table>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit price</th>
                    <th>Discount</th>
                    <th>Cost</th>
                  </tr>
                  {fields.map((field, index) => (
                    <tr key={field.key}>
                      <td style={{ verticalAlign: 'center' }}>
                        <Form.Item
                          name={[index, 'description']}
                          rules={rules}
                          style={{}}
                        >
                          <TextArea
                            className="bordered"
                            placeholder="Enter description"
                            rows={1}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'quantity']}
                          rules={rules}
                          style={{}}
                        >
                          <Input
                            className="bordered"
                            type="number"
                            placeholder="Enter quantity"
                            {...inputProps}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'unit-price']}
                          rules={rules}
                          style={{}}
                        >
                          <Input
                            className="bordered"
                            type="number"
                            placeholder="Enter unit price"
                            prefix="$"
                            {...inputProps}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'discount']}
                          rules={rules}
                          style={{}}
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
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'cost']}
                          rules={rules}
                          style={{}}
                        >
                          <Input
                            className="bordered"
                            type="number"
                            placeholder="Enter cost"
                            {...inputProps}
                          />
                        </Form.Item>
                      </td>
                      {fields.length > 1 && (
                        <td>
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
                            style={removeButtonStyle}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
              </TableWrapper>
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
