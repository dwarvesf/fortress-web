import { Card as AntCard, Col, Space, Spin, Tabs } from 'antd'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { ReactElement, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  ViewAuditData,
  ViewEngineeringHealthData,
  ViewEngineringHealthResponse,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'

interface Props {
  title: ReactElement | string
  id?: string
  tabKeys: (keyof ViewEngineeringHealthData | keyof ViewAuditData)[]
  tabIds: string[]
  swrKeys?: string[]
  fetcher: () => Promise<any>
  childrenRenderers: ((dataset: any) => JSX.Element | null)[]
}

const Card = styled(AntCard)`
  .ant-card-extra {
    padding: 0;
    width: 140px;
    min-width: 100px;
  }
`

export const CardWithTabs = (props: Props) => {
  const {
    title,
    id,
    tabKeys,
    tabIds,
    swrKeys = [],
    fetcher,
    childrenRenderers,
  } = props

  const [currentTabKey, setCurrentTabKey] = useState<
    keyof ViewEngineeringHealthData | keyof ViewAuditData
  >(tabKeys[0])
  const currentTabIndex = useMemo(
    () => tabKeys.indexOf(currentTabKey),
    [currentTabKey, tabKeys],
  )

  const { data, loading } = useFetchWithCache<ViewEngineringHealthResponse>( // TODO: BE fix typo
    [id, ...swrKeys, tabIds[currentTabIndex]],
    fetcher,
  )

  return (
    <Col span={12}>
      <Card
        bodyStyle={{
          height: '100%',
          fontSize: 16,
        }}
        title={title}
        extra={
          <Tabs
            defaultActiveKey="average"
            items={tabKeys.map((d) => ({
              key: d,
              label: capitalizeFirstLetter(d),
            }))}
            onTabClick={(k) =>
              setCurrentTabKey(
                k as keyof ViewEngineeringHealthData | keyof ViewAuditData,
              )
            }
          />
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            gap: 12,
            overflow: 'auto',
          }}
        >
          <Space direction="vertical" size={12}>
            {loading ? (
              <>
                <StatisticBlock isLoading />
                <Spin
                  size="large"
                  style={{
                    height: 230,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </>
            ) : (
              childrenRenderers[currentTabIndex](
                (data?.data || {})[currentTabKey],
              )
            )}
          </Space>
        </div>
      </Card>
    </Col>
  )
}
