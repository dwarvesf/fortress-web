import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo } from '../Logo'

const Container = styled.div`
  height: 64px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SidebarLogo = () => {
  return (
    <Container>
      <Link href={ROUTES.HOME}>
        <a>
          <Logo isWhite />
        </a>
      </Link>
    </Container>
  )
}
