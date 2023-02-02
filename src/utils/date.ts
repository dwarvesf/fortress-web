import moment from 'moment'

export const format = (date: string, format: string) => {
  return moment(date).format(format)
}
