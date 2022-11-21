import { searchFilterOption } from '../select'

test.each([
  ['On b', 'On Boarding', true],
  ['on b', 'On Boarding', true],
  ['on-ba', 'On Boarding', false],
  ['On b', '', false],
])('searchFilterOption(%s, {%s, %s})', (input, label, expected) => {
  expect(searchFilterOption(input, { label })).toBe(expected)
})
