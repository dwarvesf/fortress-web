import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { ViewProjectData } from 'types/schema'
import { AvatarWithName } from './AvatarWithName'

interface Props extends ComponentProps<typeof AvatarWithName> {
  project: ViewProjectData
  isLink?: boolean
}

export const ProjectAvatar = (props: Props) => {
  const { project, isLink = true, ...rest } = props

  return (
    <AvatarWithName
      avatar={project.avatar}
      name={project.name}
      renderName={(name) =>
        isLink ? (
          <Link href={ROUTES.PROJECT_DETAIL(project.code || '')}>
            <a className="styled">{name}</a>
          </Link>
        ) : (
          <a className="styled">{name}</a>
        )
      }
      {...rest}
    />
  )
}
