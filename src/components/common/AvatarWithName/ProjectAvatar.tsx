import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { ViewProjectData } from 'types/schema'
import { AvatarWithName } from './AvatarWithName'

interface Props {
  project: ViewProjectData
  avatarSize?: number
  fontSize?: number
}

export const ProjectAvatar = (props: Props) => {
  const { project, avatarSize, fontSize } = props

  return (
    <AvatarWithName
      avatar={project.avatar}
      name={project.name}
      renderName={(name) => (
        <Link href={ROUTES.PROJECT_DETAIL(project.id || '')}>
          <a className="styled">{name}</a>
        </Link>
      )}
      {...{ avatarSize, fontSize }}
    />
  )
}
