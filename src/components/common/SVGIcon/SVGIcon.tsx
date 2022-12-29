import { SocialLinkTypes } from 'constants/socials'
import SVG from 'react-inlinesvg'

interface SVGIconProps {
  name: SocialLinkTypes
  size?: number
}

export const SVGIcon = (props: SVGIconProps) => {
  const { name, size = 16 } = props
  return <SVG src={`/svg/${name}.svg`} width={size} height={size} />
}
