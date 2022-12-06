import { EditOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Button, Col, Image, Row, Space } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { PageHeader } from 'components/common/PageHeader'
import { EditProfileAvatarModal } from 'components/pages/profile/EditProfileAvatarModal'
import { EditProfileInfoModal } from 'components/pages/profile/EditProfileInfoModal'
import { useAuthContext } from 'context/auth'
import { theme } from 'styles'

const Default = () => {
  const { user, revalidate } = useAuthContext()

  const {
    isOpen: isEditProfileInfoDialogOpen,
    onOpen: openEditProfileInfoDialog,
    onClose: closeEditProfileInfoDialog,
  } = useDisclosure()

  const {
    isOpen: isEditAvatarDialogOpen,
    onOpen: openEditAvatarDialog,
    onClose: closeEditAvatarDialog,
  } = useDisclosure()

  return (
    <>
      <PageHeader title="Profile" />
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[0, 24]}>
          <Col lg={{ span: 16 }}>
            <EditableDetailSectionCard
              onEdit={openEditProfileInfoDialog}
              title="General Info"
            >
              <Row gutter={[24, 24]}>
                <Col span={24} lg={{ span: 8 }}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Avatar
                      size={128}
                      src={
                        user?.avatar && (
                          <Image
                            src={user?.avatar}
                            height={128}
                            preview={{
                              mask: (
                                <span style={{ fontSize: 16 }}>
                                  View avatar
                                </span>
                              ),
                            }}
                          />
                        )
                      }
                      style={{ border: `2px solid ${theme.colors.primary}` }}
                    >
                      {user?.avatar === '' && (
                        <span style={{ fontSize: 20 }}>
                          {(user.fullName || user.displayName)
                            ?.slice(0, 1)
                            .toUpperCase()}
                        </span>
                      )}
                    </Avatar>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={openEditAvatarDialog}
                    >
                      Edit
                    </Button>
                  </Space>
                </Col>
                <Col span={24} lg={{ span: 16 }}>
                  <DataRows
                    data={[
                      {
                        label: 'Full name',
                        value: user?.fullName,
                      },
                      {
                        label: 'Team email',
                        value: (
                          <a href={`mailto:${user?.teamEmail}`}>
                            {user?.teamEmail}
                          </a>
                        ),
                      },
                      {
                        label: 'Personal email',
                        value: (
                          <a href={`mailto:${user?.personalEmail}`}>
                            {user?.personalEmail}
                          </a>
                        ),
                      },
                      {
                        label: 'Phone',
                        value: (
                          <a href={`tel:${user?.phoneNumber}`}>
                            {user?.phoneNumber}
                          </a>
                        ),
                      },
                      { label: 'Discord ID', value: user?.discordID },
                      {
                        label: 'Github ID',
                        value: (
                          <a
                            href={`https://github.com/${user?.githubID}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {user?.githubID}
                          </a>
                        ),
                      },
                      { label: 'Notion ID', value: user?.notionID },
                    ]}
                  />
                </Col>
              </Row>
            </EditableDetailSectionCard>
          </Col>
        </Row>
      </Space>

      <EditProfileInfoModal
        isOpen={isEditProfileInfoDialogOpen}
        initialValues={user || {}}
        onClose={closeEditProfileInfoDialog}
        onAfterSubmit={revalidate}
      />

      <EditProfileAvatarModal
        isOpen={isEditAvatarDialogOpen}
        onClose={closeEditAvatarDialog}
        onAfterSubmit={revalidate}
      />
    </>
  )
}

export default Default
