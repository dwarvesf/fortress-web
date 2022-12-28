import SVG from 'react-inlinesvg'

interface Props {
  path: string
  size?: number
}

const SVGIconRender = (props: Props) => {
  const { path, size = 16 } = props
  return <SVG src={path} width={size} height={size} />
}

export const IconDiscord = ({ size }: { size?: number }) => {
  return <SVGIconRender path="/svg/discord.svg" size={size} />
}

export const IconGitHub = ({ size }: { size?: number }) => {
  return <SVGIconRender path="/svg/github.svg" size={size} />
}

export const IconLinkedIn = ({ size }: { size?: number }) => {
  return <SVGIconRender path="/svg/linkedin.svg" size={size} />
}

export const IconTwitter = ({ size }: { size?: number }) => {
  return <SVGIconRender path="/svg/twitter.svg" size={size} />
}

export const IconFaceBook = ({ size }: { size?: number }) => {
  return <SVGIconRender path="/svg/facebook.svg" size={size} />
}
