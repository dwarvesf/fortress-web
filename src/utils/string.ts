export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function parseJWT(token: string) {
  const base64Url = token.split('.')[1]
  if (!base64Url) return null

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2) // eslint-disable-line prefer-template
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}
