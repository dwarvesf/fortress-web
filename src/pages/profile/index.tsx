import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Row, Space } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { PageHeader } from 'components/common/PageHeader'
import { EditProfileInfoModal } from 'components/pages/profile/EditProfileInfoModal'
import { useAuthContext } from 'context/auth'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import { EditableAvatar } from 'components/common/EditableAvatar'
import { SVGIcon } from 'components/common/SVGIcon'

const Default = () => {
  const { user, revalidate } = useAuthContext()

  const {
    isOpen: isEditProfileInfoDialogOpen,
    onOpen: openEditProfileInfoDialog,
    onClose: closeEditProfileInfoDialog,
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
                  <EditableAvatar
                    onAfterSubmit={revalidate}
                    type="profile"
                    avatar={user?.avatar}
                    name={user?.displayName || user?.fullName}
                    hasEditButton
                  />
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
                        value: String(user?.phoneNumber) || '-',
                      },
                      {
                        label: 'Discord',
                        value: (
                          <Space>
                            <SVGIcon name="discord" />
                            {user?.discordName || '-'}
                          </Space>
                        ),
                      },
                      {
                        label: 'Github',
                        value: (
                          <LinkWithIcon
                            href={
                              user?.githubID
                                ? `https://github.com/${user?.githubID}`
                                : ''
                            }
                            target="_blank"
                            rel="noreferrer"
                            icon={<SVGIcon name="github" />}
                          >
                            {user?.githubID || '-'}
                          </LinkWithIcon>
                        ),
                      },
                      {
                        label: 'Notion',
                        value: (
                          <Space>
                            <SVGIcon name="notion" />
                            {user?.notionName || '-'}
                          </Space>
                        ),
                      },
                      {
                        label: 'LinkedIn',
                        value: (
                          <Space>
                            <SVGIcon name="linkedin" />
                            {user?.linkedInName || '-'}
                          </Space>
                        ),
                      },
                      { label: 'Address', value: user?.address },
                      { label: 'City', value: user?.city },
                      { label: 'Country', value: user?.country },
                      {
                        label: 'Place of Residence',
                        value: user?.placeOfResidence,
                      },
                      {
                        label: 'Wise Account Number',
                        value: user?.wiseAccountNumber || '-',
                      },
                      {
                        label: 'Wise Currency',
                        value: user?.wiseCurrency || '-',
                      },
                      {
                        label: 'Wise Recipient Email',
                        value: user?.wiseRecipientEmail || '-',
                      },
                      {
                        label: 'Wise Recipient Name',
                        value: user?.wiseRecipientName || '-',
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
    </>
  )
}

export default Default
