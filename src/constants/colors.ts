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
  'strongly-disagree': 'red',
  disagree: 'gold',
  mixed: '',
  agree: 'blue',
  'strongly-agree': 'green',
  sent: 'gray',
  new: 'red',
}

export const likertScalesColors = {
  'strongly-disagree': { background: '#ff4d4f', text: 'white' },
  disagree: { background: '#ffd666', text: 'black' },
  mixed: { background: '#788896', text: 'white' },
  agree: { background: '#597ef7', text: 'white' },
  'strongly-agree': { background: '#1aae9f', text: 'white' },
}
