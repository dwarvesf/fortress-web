import { useAuthContext } from 'context/auth'
import { client, GET_PATHS } from 'libs/apis'
import { useEffect, useMemo } from 'react'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'
import { useFetchWithCache } from './useFetchWithCache'

export const useUnreadFeedbackCount = () => {
  const { isAuthenticated } = useAuthContext()

  const { data, mutate } = useFetchWithCache([GET_PATHS.getFeedbacks], () =>
    isAuthenticated
      ? client.getPersonalFeedbacks(new FeedbackListFilter())
      : undefined,
  )
  // eslint-disable-next-line
  const feedbacks = data?.data || []

  useEffect(() => {
    if (isAuthenticated) {
      mutate()
    }
  }, [isAuthenticated]) // eslint-disable-line

  const unreadCount = useMemo(() => {
    return feedbacks.filter((feedback) => !feedback.isRead).length
  }, [feedbacks])

  return {
    unreadCount,
  }
}
