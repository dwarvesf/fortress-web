import { SocialIconTypes } from 'constants/socials'
import React, { SVGProps } from 'react'
import SVG from 'react-inlinesvg'

interface SVGIconProps extends SVGProps<SVGElement> {
  name: SocialIconTypes
  size?: number
}

export const SVGIcon = (props: SVGIconProps) => {
  const { name, size = 16, color, ...rest } = props
  return (
    // @ts-ignore
    <SVG src={`/svg/${name}.svg`} width={size} height={size} {...rest} />
  )
}
