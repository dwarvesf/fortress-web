import React, { SVGProps } from 'react'
import SVG from 'react-inlinesvg'
import { IconName } from './types'

interface SVGIconProps extends SVGProps<SVGElement> {
  name: IconName
  size?: number
}

export const SVGIcon = (props: SVGIconProps) => {
  const { name, size = 16, color, ...rest } = props
  return (
    // @ts-ignore
    <SVG src={`/svg/${name}.svg`} width={size} height={size} {...rest} />
  )
}
