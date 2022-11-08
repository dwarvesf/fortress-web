export const isActivePath = (href: string, pathname: string) => {
  return (
    (href === '/' && href === pathname) ||
    (href !== '/' && pathname.startsWith(href))
  )
}
