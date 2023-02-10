import { fillQuarters } from '../quarter'

test.each([
  [['Q1/2020'], ['Q2/2019', 'Q3/2019', 'Q4/2019', 'Q1/2020']],
  [
    ['Q3/2022', 'Q4/2022', 'Q1/2023'],
    ['Q2/2022', 'Q3/2022', 'Q4/2022', 'Q1/2023'],
  ],
  [
    ['Q2/2022', 'Q4/2022'],
    ['Q1/2022', 'Q2/2022', 'Q3/2022', 'Q4/2022'],
  ],
  [
    ['Q4/2022', 'Q2/2023'],
    ['Q3/2022', 'Q4/2022', 'Q1/2023', 'Q2/2023'],
  ],
])('fillQuarters(%s, %s)', (quarters, expected) => {
  expect(fillQuarters(quarters)).toStrictEqual(expected)
})
