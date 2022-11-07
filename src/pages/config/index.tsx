import { Button, Typography } from 'antd'
import { useAuthContext } from 'context/auth'

const Default = () => {
  const { logout, session } = useAuthContext()
  const { Text } = Typography

  return (
    <>
      <Text>{session?.user?.name}</Text>
      <br />
      <Button onClick={() => logout()}>Logout</Button>
    </>
  )
}

export default Default
