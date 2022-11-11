import { Button as AntButton, ButtonProps } from 'antd'
import styled from 'styled-components'
import { theme } from 'styles'

const TextPrimaryButton = styled(AntButton)`
  color: ${theme.colors.primary};
`

type ExtendedType = ButtonProps['type'] | 'text-primary'
interface Props extends Omit<ButtonProps, 'type'> {
  type: ExtendedType
}

export const Button = (props: Props) => {
  switch (props.type) {
    case 'text-primary': {
      return <TextPrimaryButton {...props} type="text" />
    }
    default: {
      // @ts-ignore
      return <AntButton {...props} />
    }
  }
}
