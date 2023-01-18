import { Card as AntCard, Col, Space, Spin, Tabs } from 'antd'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { ReactElement, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  ViewAuditData,
  ViewAuditResponse,
  ViewEngineeringHealthData,
  ViewEngineringHealthResponse,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'

interface Props {
  title: ReactElement | string
  groupKeys: string[]
  tabTitles: (keyof ViewEngineeringHealthData | keyof ViewAuditData)[]
  fetcher: () => Promise<any>
  childrenRenderers: ((dataset: any) => JSX.Element | null)[] //
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
    groupKeys, // works as identifiers for each tabs of a specific card, and also keys for swr, e.g ['engineering-health', 'average', selectedProjectId]
    tabTitles, // used for tab's key and label
    fetcher,
    childrenRenderers, // children renderer for each tab
  } = props

  const [currentTab, setCurrentTab] = useState<
    keyof ViewEngineeringHealthData | keyof ViewAuditData
  >(tabTitles[0])

  const currentTabIndex = useMemo(
    () => tabTitles.indexOf(currentTab),
    [currentTab, tabTitles],
  )

  const { data, loading } = useFetchWithCache<
    ViewEngineringHealthResponse | ViewAuditResponse // TODO: BE fix typo
  >([...groupKeys, tabTitles[currentTabIndex]], fetcher)

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
            defaultActiveKey={tabTitles[0]}
            items={tabTitles.map((d) => ({
              key: d,
              label: capitalizeFirstLetter(d),
            }))}
            onTabClick={(k) =>
              setCurrentTab(
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
              childrenRenderers[currentTabIndex]((data?.data || {})[currentTab])
            )}
          </Space>
        </div>
      </Card>
    </Col>
  )
}
