import { ViewProjectData } from 'types/schema'
import { ProjectLink } from '../DetailLink'
import { AvatarWithName } from './AvatarWithName'

interface Props {
  project: ViewProjectData
  avatarSize?: number
  fontSize?: number
  isLink?: boolean
}

export const ProjectAvatar = (props: Props) => {
  const { project, avatarSize, fontSize, isLink = true } = props

  return isLink ? (
    <ProjectLink id={project.id!}>
      <AvatarWithName
        // avatar={project.avatar}
        name={project.name}
        {...{ avatarSize, fontSize }}
      />
    </ProjectLink>
  ) : (
    <AvatarWithName
      // avatar={project.avatar}
      name={project.name}
      {...{ avatarSize, fontSize }}
    />
  )
}
