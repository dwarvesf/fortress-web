import { DefaultOptionType } from 'antd/lib/select'
import {
  ViewEmployeeData,
  ViewOrganization,
  ViewProjectMember,
} from 'types/schema'

export function transformMetadataToSelectOption(metaItem: {
  id?: string
  name?: string
  code?: string
}): DefaultOptionType {
  return { label: metaItem.name, value: metaItem.id || metaItem.code }
}

export function transformMetadataToFilterOption(metaItem: {
  code?: string
  name?: string
}) {
  return { text: metaItem.name, value: metaItem.code }
}

export function transformEmployeeDataToSelectOption(
  metaItem: ViewEmployeeData,
) {
  const { id } = metaItem

  return {
    value: id,
    label: metaItem,
  }
}

export function transformProjectMemberDataToSelectOption(
  metaItem: ViewProjectMember,
) {
  const { employeeID } = metaItem

  return {
    value: employeeID,
    label: { ...metaItem, id: employeeID },
  }
}

export function transformOrganizationMetaDataToSelectOption(
  metaItem: ViewOrganization,
) {
  const { id } = metaItem

  return {
    value: id,
    label: metaItem,
  }
}

export const searchFilterOption = (
  input: string,
  option?: DefaultOptionType,
) => {
  if (!option?.label) {
    return false
  }

  return String(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0
}
