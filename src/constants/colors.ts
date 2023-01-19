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
  green: likertScalesColors['strongly-agree'].background,
  gray: likertScalesColors.mixed.background,
  red: likertScalesColors['strongly-disagree'].background,
}

export const chartColors = [
  theme.colors.primary, // primary
  likertScalesColors.agree.background, // blue
  likertScalesColors['strongly-agree'].background, // green
  likertScalesColors.disagree.background, // yellow
  likertScalesColors.mixed.background, // gray
  likertScalesColors['strongly-disagree'].background, // red
  '#67E8F9', // cyan
  '#F97316', // orange
  '#A855F7', // purple
  '#84CC16', // lime
  '#0EA5E9', // sky
  '#6366F1', // indigo
  '#EC4899', // pink
  '#D946EF', // fuchsia
  '#10B981', // emerald
]
