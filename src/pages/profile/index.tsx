import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Col, Image, Row, Space } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { PageHeader } from 'components/common/PageHeader'
import { EditProfileAvatarModal } from 'components/pages/profile/EditProfileAvatarModal'
import { EditProfileInfoModal } from 'components/pages/profile/EditProfileInfoModal'
import { useAuthContext } from 'context/auth'
import { theme } from 'styles'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { Edit, Github } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { getFirstLetterCapitalized } from 'utils/string'
import { LinkWithIcon } from 'components/common/LinkWithIcon'

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
      <SEO title="Profile" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Profile',
          },
        ]}
      />

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
                            height="100%"
                            width="100%"
                            style={{ objectFit: 'cover' }}
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
                          {getFirstLetterCapitalized(
                            user.displayName || user.fullName,
                          )}
                        </span>
                      )}
                    </Avatar>
                    <Button
                      type="primary"
                      icon={<Edit size={20} />}
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
                        label: 'Full Name',
                        value: user?.fullName,
                      },
                      {
                        label: 'Team Email',
                        value: user?.teamEmail || '-',
                      },
                      {
                        label: 'Personal Email',
                        value: user?.personalEmail || '-',
                      },
                      {
                        label: 'Phone',
                        value: user?.phoneNumber || '-',
                      },
                      {
                        label: 'Discord ID',
                        value: user?.discordID || '',
                      },
                      {
                        label: 'Github ID',
                        value: user?.githubID ? (
                          <LinkWithIcon
                            href={`https://github.com/${user?.githubID}`}
                            target="_blank"
                            rel="noreferrer"
                            icon={<Github />}
                          >
                            {user.githubID}
                          </LinkWithIcon>
                        ) : (
                          '-'
                        ),
                      },
                      { label: 'Notion Email', value: user?.notionID },
                      { label: 'LinkedIn', value: '' },
                      { label: 'Shelter Address', value: user?.address },
                      { label: 'Permanent Address', value: '' },
                      { label: 'Country', value: '' },
                      { label: 'City', value: '' },
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
        avatar={user?.avatar}
        name={user?.displayName || user?.fullName}
      />
    </>
  )
}

export default Default
