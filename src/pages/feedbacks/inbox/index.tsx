import { Pagination, Row, Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { FeedbackInputTable } from 'components/pages/feedbacks/inbox/FeedbackInboxTable'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'
import { ModelEventReviewerStatus } from 'types/schema'

const Default = () => {
  const { tabKey, setTabKey } = useTabWithQuery({ queryKey: 'inbox' })

  const onTabChange = (tabKey: string) => {
    setTabKey(tabKey)
  }

  const { filter: allFilter, setFilter: setAllFilter } = useFilter({
    ...new FeedbackListFilter(),
  })
  const { filter: draftFilter, setFilter: setDraftFilter } = useFilter({
    ...new FeedbackListFilter(
      ModelEventReviewerStatus.EventReviewerStatusDraft,
    ),
  })

  const { data: allData, loading: isAllLoading } = useFetchWithCache(
    [GET_PATHS.getFeedbacks, allFilter],
    () => client.getPersonalFeedbacks(allFilter),
  )
  const allFeedbacks = allData?.data || []

  const { data: draftData, loading: isDraftLoading } = useFetchWithCache(
    [GET_PATHS.getFeedbacks, draftFilter],
    () => client.getPersonalFeedbacks(draftFilter),
  )
  const draftFeedbacks = draftData?.data || []

  const paginationRender = useMemo(() => {
    let filter: any
    let data: any
    let setFilter: any

    switch (tabKey) {
      case ModelEventReviewerStatus.EventReviewerStatusDraft: {
        filter = draftFilter
        data = draftData
        setFilter = setDraftFilter

        break
      }
      default: {
        filter = allFilter
        data = allData
        setFilter = setAllFilter

        break
      }
    }

    return data?.total && data?.total > filter.size ? (
      <Row justify="end">
        <Pagination
          current={filter.page}
          onChange={(page) => setFilter({ page })}
          total={data?.total}
          pageSize={filter.size}
        />
      </Row>
    ) : null
  }, [
    tabKey,
    allData,
    draftData,
    allFilter,
    draftFilter,
    setAllFilter,
    setDraftFilter,
  ])

  return (
    <>
      <PageHeader title="Feedbacks" />
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={onTabChange}
        items={[
          {
            key: 'inbox',
            label: `Inbox (${allFeedbacks.length})`,
            children: (
              <FeedbackInputTable
                data={allFeedbacks}
                isLoading={isAllLoading}
                // onAfterAction={mutate}
              />
            ),
          },
          // {
          //   key: 'sent',
          //   label: `Sent`,
          //   children: (
          //     <FeedbackInputTable
          //       data={[]}
          //       // isLoading={isPendingLoading}
          //       // onAfterAction={mutate}
          //     />
          //   ),
          // },
          {
            key: 'draft',
            label: `Draft (${draftFeedbacks.length})`,
            children: (
              <FeedbackInputTable
                data={draftFeedbacks}
                isLoading={isDraftLoading}
                // onAfterAction={mutate}
              />
            ),
          },
        ]}
      />
      {paginationRender}
    </>
  )
}

export default Default
