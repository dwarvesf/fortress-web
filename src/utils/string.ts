export function capitalizeFirstLetter(value = '') {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getFirstLetterCapitalized(value = '') {
  return value.slice(0, 1).toUpperCase()
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

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`)

export const getErrorMessage = (error?: any, prefix?: string) => {
  const message = [prefix, error?.message].join(' - ')
  return message || 'Unknown error'
}

export const removeLeadingZero = (phoneNumber: string) =>
  (phoneNumber || '')[0] === '0' ? phoneNumber.slice(1) : phoneNumber

export const formatPhoneNumber = (dialCode: string, phoneNumber?: string) => {
  if (phoneNumber === undefined) return ''

  // array containing 2 parts of full phone number
  // dial code & phone number
  const phoneNumberElements: string[] = []

  // if phone number has the form +84 12345...
  // parse the first part as '84' and the second part as '12345...'
  if (phoneNumber.includes('+')) {
    const parsedDialCode = phoneNumber.split(' ')[0].slice(1)
    const parsedPhoneNumber = phoneNumber.split(' ')[1]

    phoneNumberElements.push(
      parsedDialCode,
      removeLeadingZero(parsedPhoneNumber),
    )
  } else {
    // if phone number has only numbers part (012345...)
    // remove leading 0 and join with the dialCode param
    phoneNumberElements.push(dialCode, removeLeadingZero(phoneNumber))
  }

  return `+${phoneNumberElements.join(' ')}`
}
