import { TagProps } from 'antd'
import { theme } from 'styles'

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

export const chartTrendColors = {
  green: '#1aae9f',
  gray: '#788896',
  red: '#ff4d4f',
}

export const chartPieColors = [
  theme.colors.primary, // primary
  '#60A5FA', // blue
  '#4ADE80', // green
  '#FACC15', // yellow
  '#FB923C', // orange
  '#22D3EE', // cyan
  '#F472B6', // pink
  '#C084FC', // purple
  '#A3E635', // lime
  '#F87171', // red
  '#E879F9', // fuchsia
  '#818CF8', // indigo
  '#38BDF8', // sky
  '#34D399', // emerald
  '#FBBF24', // amber
]
