import { FEATURES } from 'constants/features'
import { ROUTES } from 'constants/routes'
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

const routesToCheck = [
  {
    pathname: ROUTES.HOME,
    redirectUrl: ROUTES.DASHBOARD,
  },
  {
    pathname: ROUTES.DASHBOARD,
    feature: FEATURES.DASHBOARD,
    redirectUrl: ROUTES.PROJECTS,
  },
  {
    pathname: ROUTES.CONFIG,
    feature: FEATURES.CONFIG,
    redirectUrl: ROUTES.PROJECTS,
  },
]

export const useShouldRedirect = () => {
  const { pathname, push } = useRouter()
  const ldClient = useLDClient()
  const flags = useFlags()

  const { shouldRedirect, redirectUrl } = useMemo(() => {
    let redirectUrl = pathname
    let shouldRedirect = false

    if (ldClient) {
      // Loop and find a valid redirectUrl, which should be:
      // 1. Routes that are not in the routesToCheck array
      // 2. Routes that are in the routesToCheck array & are allowed by feature flags
      while (1) {
        // Check if the pathname match the routes that should be check for redirection
        const route = routesToCheck.find(
          // eslint-disable-next-line
          (r) =>
            (r.pathname !== '/' && redirectUrl.startsWith(r.pathname)) ||
            (r.pathname === '/' && redirectUrl === r.pathname),
        )

        // If route exists
        if (route) {
          // If route is feature-dependent, redirect if feature flag is not on
          // Also redirect if feature is not defined
          if (
            (route.feature && flags[route.feature] === false) ||
            route.feature === undefined
          ) {
            shouldRedirect = true
            redirectUrl = route.redirectUrl
          } else {
            break
          }
        } else {
          break
        }
      }
    }

    return {
      redirectUrl,
      shouldRedirect,
    }
  }, [ldClient, flags, pathname])

  useEffect(() => {
    if (shouldRedirect) {
      push(redirectUrl)
    }
  }, [shouldRedirect]) // eslint-disable-line

  return shouldRedirect
}
