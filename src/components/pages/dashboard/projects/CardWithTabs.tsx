import { Card as AntCard, Col, Space, Spin, Tabs } from 'antd'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { ReactElement, useId, useMemo, useState } from 'react'
import styled from 'styled-components'
import { capitalizeFirstLetter } from 'utils/string'

interface Props {
  title: ReactElement | string
  id?: string
  tabKeys: string[]
  swrKeys: string[]
  fetchers: (() => Promise<any[]>)[]
  childrenRenderers: ((dataset: any) => JSX.Element | null)[] // TODO: update type
}

const Card = styled(AntCard)`
  .ant-card-extra {
    padding: 0;
    width: 130px;
    min-width: 100px;
  }
`

export const CardWithTabs = (props: Props) => {
  const { title, id, tabKeys, swrKeys, fetchers, childrenRenderers } = props

  const [currentTabKey, setCurrentTabKey] = useState<string>(tabKeys[0])
  const currentTabIndex = useMemo(
    () => tabKeys.indexOf(currentTabKey),
    [currentTabKey, tabKeys],
  )

  const uniqueId = useId()
  const componentId = id || uniqueId

  const { data = [], loading } = useFetchWithCache<any[], Error>( // TODO: update type
    [swrKeys[currentTabIndex], componentId],
    fetchers[currentTabIndex],
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
            onTabClick={setCurrentTabKey}
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
              <Spin
                size="large"
                style={{
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
            ) : (
              childrenRenderers[currentTabIndex](data)
            )}
          </Space>
        </div>
      </Card>
    </Col>
  )
}
