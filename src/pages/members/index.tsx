import { Button } from 'antd'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from 'styles'

const PrimaryButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: 500;
  border-radius: 4px;
`

const Default = () => {
  const { push } = useRouter()

  return (
    <div>
      <PrimaryButton onClick={() => push(ROUTES.ADD_MEMBER)}>
        Add Member
      </PrimaryButton>
    </div>
  )
}

export default Default
