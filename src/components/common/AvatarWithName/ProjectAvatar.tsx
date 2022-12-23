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
    <AvatarWithName
      // avatar={project.avatar}
      name={project.name}
      renderName={(name) => (
        <ProjectLink id={project.id!} className="styled">
          {name}
        </ProjectLink>
      )}
      {...{ avatarSize, fontSize }}
    />
  )
}
