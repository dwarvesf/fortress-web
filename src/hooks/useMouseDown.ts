import { useRouter } from 'next/router'

export const useMouseDown = () => {
  const { push } = useRouter()

  const openLink = (url: string) => (e: React.MouseEvent<any, MouseEvent>) => {
    if (e.defaultPrevented) return
    if (e.button === 1 || e.ctrlKey || e.metaKey) {
      window.open(`${window.location.origin}${url}`, '_blank')
    } else {
      push(url)
    }
  }

  return { openLink }
}
