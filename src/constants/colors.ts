import { TagProps } from 'antd'

// Unfortunately we cannot use a stricter type for the key here (yet)
// because it's a collection of employee/project/project member statuses,
// some of which are metadata we need to fetch from the BE. So we'll
// just leave this as something generic (string) for now.
export const statusColors: Record<string, TagProps['color']> = {
  active: 'green',
  probation: 'green',
  'on-boarding': 'gold',
  'on-leave': 'gold',
  paused: 'gold',
  closed: '',
  left: '',
  'full-time': 'green',
  contractor: 'cyan',
  draft: '',
  'in-progress': 'gold',
  done: 'green',
  archived: 'gold',
}
