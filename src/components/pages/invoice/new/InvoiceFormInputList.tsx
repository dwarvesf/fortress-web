import { Icon } from '@iconify/react'
import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import styled from 'styled-components'
import { NumericFormat } from 'react-number-format'
import { ViewCurrency } from 'types/schema'
import { Button } from '../../../common/Button'
import { formatCurrency } from '../../../../utils/currency'

interface Props {
  name: string
  currency?: ViewCurrency
  summary: { subtotal: number; total: number; discount: number }
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

      &:last-of-type {
        padding-right: 0 !important;
      }
    }
  }
`

export const InvoiceFormInputList = (props: Props) => {
  const { name, currency, summary } = props

  return (
    <>
      <div
        style={{
          overflow: 'auto',
        }}
      >
        <Form.List name={name}>
          {(fields, { add, remove }) => (
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit price</th>
                    <th>Discount</th>
                    <th>Cost</th>
                    <th style={{ width: 48 }}>
                      <Button
                        type="text-primary"
                        size="small"
                        icon={<Icon icon="icon-park-outline:plus" width={20} />}
                        onClick={() => add()}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.key}>
                      <td style={{ verticalAlign: 'center' }}>
                        <Form.Item
                          name={[index, 'description']}
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <TextArea
                            className="bordered"
                            placeholder="Enter description"
                            rows={1}
                            style={{ minWidth: 250 }}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'quantity']}
                          rules={[
                            {
                              type: 'number',
                              required: true,
                              min: 1,
                              message: 'Greater than 1',
                            },
                          ]}
                          normalize={(value) =>
                            value
                              ? Number(value.replace(/[^\d.]/g, ''))
                              : undefined
                          }
                        >
                          <NumericFormat
                            className="bordered"
                            placeholder="Enter quantity"
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={0}
                            style={{ textAlign: 'right', minWidth: 120 }}
                            customInput={Input}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'unitCost']}
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                          normalize={(value) =>
                            value
                              ? Number(value.replace(/[^\d.]/g, ''))
                              : undefined
                          }
                        >
                          <NumericFormat
                            className="bordered"
                            placeholder="Enter unit price"
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={3}
                            suffix={currency?.symbol}
                            style={{ textAlign: 'right', minWidth: 120 }}
                            customInput={Input}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item
                          name={[index, 'discount']}
                          rules={[
                            {
                              type: 'number',
                              max: 100,
                              message: 'Less than 100',
                            },
                          ]}
                          normalize={(value) =>
                            value
                              ? Number(value.replace(/[^\d.]/g, ''))
                              : undefined
                          }
                        >
                          <NumericFormat
                            className="bordered"
                            placeholder="Enter discount"
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={3}
                            suffix="%"
                            style={{ textAlign: 'right', minWidth: 120 }}
                            customInput={Input}
                          />
                        </Form.Item>
                      </td>

                      <td>
                        <Form.Item name={[index, 'cost']}>
                          <NumericFormat
                            className="bordered disabled"
                            thousandSeparator=","
                            suffix={currency?.symbol}
                            style={{ textAlign: 'right', minWidth: 120 }}
                            readOnly
                            customInput={Input}
                          />
                        </Form.Item>
                      </td>
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
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>
          )}
        </Form.List>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div>
          Subtotal:{' '}
          {currency && summary.subtotal
            ? formatCurrency(summary.subtotal, {
                currency: currency.name,
              })
            : '-'}
        </div>
        <div>
          Total:{' '}
          {currency && summary.total
            ? formatCurrency(summary.total, {
                currency: currency.name,
              })
            : '-'}
        </div>
      </div>
    </>
  )
}
