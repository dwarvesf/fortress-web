export type IconName =
  | 'discord'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'facebook'
  | 'google'

interface SocialLink {
  name: IconName
  url: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'discord',
    url: 'https://discord.gg/Y2vvH9rQE4',
  },
  {
    name: 'github',
    url: 'https://github.com/dwarvesf',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/dwarvesf/',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/dwarvesf',
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/dwarvesf',
  },
]
