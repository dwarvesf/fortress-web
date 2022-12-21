import { ViewProjectData } from 'types/schema'
import { ProjectLink } from '../DetailLink'
import { AvatarWithName } from './AvatarWithName'

interface Props {
  project: ViewProjectData
  avatarSize?: number
  fontSize?: number
}

export const ProjectAvatar = (props: Props) => {
  const { project, avatarSize, fontSize } = props

  return (
    <ProjectLink id={project.id!}>
      <AvatarWithName
        // avatar={project.avatar}
        name={project.name}
        {...{ avatarSize, fontSize }}
      />
    </ProjectLink>
  )
}
