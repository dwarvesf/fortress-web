import { ViewBasicEmployeeInfo } from 'types/schema'

interface Props {
  employees: ViewBasicEmployeeInfo[]
  numOfVisibleName?: number
}

export const NameArray = ({ employees, numOfVisibleName = 3 }: Props) => {
  const displayNames = employees
    .slice(0, numOfVisibleName)
    .map((each) => <strong>{each.displayName}</strong>)
  const displayValues = [
    ...displayNames,
    ...(employees.length > numOfVisibleName
      ? [`+${employees.length - numOfVisibleName} more people`]
      : []),
  ]

  return (
    <>
      {displayValues.reduce((prev, curr, index) => (
        <>
          {prev}
          {index === displayValues.length - 1 ? ' and ' : ', '}
          {curr}
        </>
      ))}
    </>
  )
}
