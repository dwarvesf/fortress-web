import { Button, Typography } from 'antd'
import { AuthenticatedLayout } from 'components/common/AuthenticatedLayout'
import { useAuthContext } from 'context/auth'

const Default = () => {
  const { logout, session } = useAuthContext()
  const { Text } = Typography

  return (
    <AuthenticatedLayout>
      <Text>{session?.user?.name}</Text>
      <br />
      <Button onClick={() => logout()}>Logout</Button>
    </AuthenticatedLayout>
  )
}

export default Default
