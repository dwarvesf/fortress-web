import { ViewBasicEmployeeInfo } from 'types/schema'

interface Props {
  employees: ViewBasicEmployeeInfo[]
  numOfVisibleName?: number
}

export const NameArray = ({ employees, numOfVisibleName = 3 }: Props) => {
  const employeeNames = employees.map((each) => each.displayName || '-')

  // filter unique name array
  const uniqueEmployeeNames: string[] = []

  employeeNames.forEach((n: string) => {
    if (!uniqueEmployeeNames.includes(n)) {
      uniqueEmployeeNames.push(n)
    }
  })

  const displayNames = uniqueEmployeeNames
    .slice(0, numOfVisibleName)
    .map((each) => <strong>{each}</strong>)

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
