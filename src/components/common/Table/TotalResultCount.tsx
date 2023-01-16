import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 12px;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray500};
`

interface Props {
  count?: number
  suffix?: string
  permission?: Permission
}

export const TotalResultCount = ({
  count = 0,
  suffix = 'item(s)',
  permission,
}: Props) => {
  const { permissions } = useAuthContext()

  if (permission && !permissions.includes(permission)) {
    return null
  }

  return (
    <Container>
      {count} {suffix}
    </Container>
  )
}
