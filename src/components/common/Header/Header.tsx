import { Col, Layout, Row } from 'antd'
import { ProfileDropdown } from '../AuthenticatedLayout/ProfileDropdown'

const { Header: AntHeader } = Layout

export const Header = () => {
  return (
    <AntHeader>
      <Row
        align="middle"
        justify="space-between"
        style={{ width: '100%', height: '100%' }}
      >
        <Col>
          <div id="breadcrumb" />
        </Col>
        <Col>
          <ProfileDropdown />
        </Col>
      </Row>
    </AntHeader>
  )
}
