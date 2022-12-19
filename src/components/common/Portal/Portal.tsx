import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  selector: string
}

export const Portal = (props: Props) => {
  const { children, selector } = props

  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? ReactDOM.createPortal(children, ref.current!) : null
}
