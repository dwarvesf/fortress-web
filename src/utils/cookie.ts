import dayjs from 'dayjs'

export function getCookie(cname: string) {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function setCookie(
  cname: string,
  cvalue: string,
  config?: { expires?: Date; domain?: string },
) {
  document.cookie = `${cname}=${cvalue}; expires=${config?.expires}; domain=${config?.domain}; path=/`
}

export function removeCookie(cname: string, config?: { domain?: string }) {
  const pass = dayjs().subtract(1, 'year')
  document.cookie = `${cname}=; expires=${pass.toDate()}; domain=${
    config?.domain
  }; path=/`
}
