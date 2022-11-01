import { Meta, Story } from '@storybook/react'
import { Logo, Props } from './Logo'

export default {
  title: 'components/common/Logo',
  component: Logo,
} as Meta

const Template: Story<Props> = (args) => {
  return <Logo {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  hasText: true,
}
