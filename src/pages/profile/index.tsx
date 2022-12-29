import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Row, Space } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { PageHeader } from 'components/common/PageHeader'
import { EditProfileInfoModal } from 'components/pages/profile/EditProfileInfoModal'
import { useAuthContext } from 'context/auth'
import { Button } from 'components/common/Button'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { Edit, Github } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import {
  EditableAvatar,
  EditAvatarModal,
} from 'components/common/EditableAvatar'

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
                    <EditableAvatar
                      onAfterSubmit={revalidate}
                      type="profile"
                      avatar={user?.avatar}
                      name={user?.displayName || user?.fullName}
                      editable={false}
                    />
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
                        label: 'Discord',
                        value: user?.discordName || '',
                      },
                      {
                        label: 'Github',
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
                      { label: 'Notion', value: user?.notionName },
                      { label: 'LinkedIn', value: '' },
                      { label: 'Address', value: user?.address },
                      { label: 'City', value: user?.city },
                      { label: 'Country', value: user?.country },
                      {
                        label: 'Place of Residence',
                        value: user?.placeOfResidence,
                      },
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

      <EditAvatarModal
        isOpen={isEditAvatarDialogOpen}
        onClose={closeEditAvatarDialog}
        onAfterSubmit={revalidate}
        type="profile"
        avatar={user?.avatar}
        name={user?.displayName || user?.fullName}
      />
    </>
  )
}

export default Default
