import { likertScalesColors } from 'constants/colors'
import { ReactElement } from 'react'
import { mapScoreToLikertScale } from 'utils/score'

interface Props {
  stat: number
  statColor?: string
  postfix?: ReactElement | string
  postfixColor?: string
}

export const StatisticBlock = (props: Props) => {
  const {
    stat,
    postfix,
    statColor = likertScalesColors[mapScoreToLikertScale(stat || 0)].background,
    postfixColor = likertScalesColors[mapScoreToLikertScale(stat || 0)]
      .background,
  } = props

  return (
    <span style={{ lineHeight: 1 }}>
      <span
        style={{
          color: statColor,
          fontSize: 36,
          fontWeight: 600,
        }}
      >
        {stat}
      </span>

      {postfix && (
        <span
          style={{
            marginLeft: 4,
            color: postfixColor,
            fontSize: 18,
          }}
        >
          {postfix}
        </span>
      )}
    </span>
  )
}
