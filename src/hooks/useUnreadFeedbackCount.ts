import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'
import { useFetchWithCache } from './useFetchWithCache'

export const useUnreadFeedbackCount = () => {
  const { data } = useFetchWithCache([GET_PATHS.getFeedbacks], () =>
    client.getPersonalFeedbacks(new FeedbackListFilter()),
  )
  // eslint-disable-next-line
  const feedbacks = data?.data || []

  const unreadCount = useMemo(() => {
    return feedbacks.filter((feedback) => !feedback.isRead).length
  }, [feedbacks])

  return {
    unreadCount,
  }
}
