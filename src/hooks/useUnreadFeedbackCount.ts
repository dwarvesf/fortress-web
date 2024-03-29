import { useAuthContext } from 'context/auth'
import { client, GET_PATHS } from 'libs/apis'
import { useEffect } from 'react'
import { useFetchWithCache } from './useFetchWithCache'

export const useUnreadFeedbackCount = () => {
  const { isAuthenticated } = useAuthContext()

  const { data, mutate } = useFetchWithCache(
    [GET_PATHS.getUnreadFeedbacks],
    () => (isAuthenticated ? client.getUnreadFeedbacks() : undefined),
  )
  // eslint-disable-next-line
  const feedbacks = data?.data

  useEffect(() => {
    if (isAuthenticated) {
      mutate()
    }
  }, [isAuthenticated]) // eslint-disable-line

  return {
    unreadCount: feedbacks?.count || 0,
  }
}
