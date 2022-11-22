import { EditOutlined, FileImageOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Button, Col, Row, Space } from 'antd'
import { DataRows } from 'components/common/DataRows'
import { EditableDetailSectionCard } from 'components/common/EditableDetailSectionCard'
import { PageHeader } from 'components/common/PageHeader'
import { EditProfileInfoModal } from 'components/pages/profile/EditProfileInfoModal'
import { useAuthContext } from 'context/auth'

const Default = () => {
  const { user, revalidate } = useAuthContext()
  const {
    isOpen: isEditProfileInfoDialogOpen,
    onOpen: openEditProfileInfoDialog,
    onClose: closeEditProfileInfoDialog,
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
              <Row gutter={24}>
                <Col span={24} lg={{ span: 8 }}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Avatar
                      size={128}
                      icon={<FileImageOutlined />}
                      src={user?.avatar}
                    />
                    <Button type="primary" icon={<EditOutlined />} disabled>
                      Edit
                    </Button>
                  </Space>
                </Col>
                <Col span={24} lg={{ span: 16 }}>
                  <DataRows
                    data={[
                      {
                        label: 'Fullname',
                        value: user?.fullName,
                      },
                      {
                        label: 'Team email',
                        value: user?.teamEmail,
                      },
                      { label: 'Personal email', value: user?.personalEmail },
                      { label: 'Phone', value: user?.phoneNumber },
                      { label: 'Discord ID', value: user?.discordID },
                      { label: 'Github ID', value: user?.githubID },
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
    </>
  )
}

export default Default