import { PreviewOpen } from '@icon-park/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { ViewSurvey } from 'types/schema'

export const Actions = ({ record }: { record: ViewSurvey }) => {
  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Link href={ROUTES.EMPLOYEE_ENGAGEMENT_DETAIL(record.id || '')}>
          <a>
            <Tooltip title="View">
              <Button
                type="text-primary"
                size="small"
                icon={<PreviewOpen size={20} />}
              />
            </Tooltip>
          </a>
        </Link>
      </Col>
    </Row>
  )
}
