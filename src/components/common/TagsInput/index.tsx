import React, { Dispatch, SetStateAction } from 'react'
import { TagsInput } from 'react-tag-input-component'

interface Props {
  values: string[]
  setValues: Dispatch<SetStateAction<string[]>>
  placeholder?: string
}

export const TagInput = (props: Props) => {
  const { values, setValues, placeholder } = props

  return (
    <TagsInput
      value={values}
      onChange={setValues}
      name="tags"
      placeHolder={placeholder}
    />
  )
}
