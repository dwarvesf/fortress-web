import { Spin } from 'antd'
import { likertScalesColors } from 'constants/colors'
import { ReactElement } from 'react'
import { mapScoreToLikertScale } from 'utils/score'

interface Props {
  stat?: number | string
  statColor?: string
  postfix?: ReactElement | string
  postfixColor?: string
  isLoading?: boolean
}

export const StatisticBlock = (props: Props) => {
  const {
    stat,
    postfix,
    statColor = likertScalesColors[mapScoreToLikertScale(Number(stat || 0))]
      .background,
    postfixColor,
    isLoading = false,
  } = props

  return (
    <span style={{ lineHeight: 1, display: 'flex', alignItems: 'end' }}>
      {isLoading ? (
        <Spin
          style={{
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <>
          <span
            style={{
              color: statColor,
              fontSize: 36,
              fontWeight: 600,
              lineHeight: 0.85,
            }}
          >
            {stat || '-'}
          </span>

          {postfix && (
            <span
              style={{
                marginLeft: 4,
                color: postfixColor || statColor,
                fontSize: 18,
              }}
            >
              {isLoading ? null : postfix}
            </span>
          )}
        </>
      )}
    </span>
  )
}
