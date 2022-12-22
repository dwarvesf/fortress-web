import { ROUTES } from 'constants/routes'
import { WithChildren } from 'types/common'
import { LinkWithIcon } from '../LinkWithIcon'

interface Props extends WithChildren {
  id: string
}

export const ProjectLink = (props: Props) => {
  const { id, children } = props

  return (
    <LinkWithIcon href={ROUTES.PROJECT_DETAIL(id)}>{children}</LinkWithIcon>
  )
}
