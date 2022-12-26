import { Pagination, Row, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { FeedbackInputTable } from 'components/pages/feedbacks/inbox/FeedbackInboxTable'
import { ROUTES } from 'constants/routes'
import { ModelEventReviewerStatus } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'

const Default = () => {
  const { tabKey, setTabKey } = useTabWithQuery({ queryKey: 'all' })

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
  const { filter: doneFilter, setFilter: setDoneFilter } = useFilter({
    ...new FeedbackListFilter(ModelEventReviewerStatus.EventReviewerStatusDone),
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

  const { data: doneData, loading: isDoneLoading } = useFetchWithCache(
    [GET_PATHS.getFeedbacks, doneFilter],
    () => client.getPersonalFeedbacks(doneFilter),
  )
  const doneFeedbacks = doneData?.data || []

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
      case ModelEventReviewerStatus.EventReviewerStatusDone: {
        filter = doneFilter
        data = doneData
        setFilter = setDoneFilter

        break
      }
      default: {
        filter = allFilter
        data = allData
        setFilter = setAllFilter

        break
      }
    }

    return (
      <Row justify="end">
        <Pagination
          current={filter.page}
          onChange={(page) => setFilter({ page })}
          total={data?.total}
          pageSize={filter.size}
          hideOnSinglePage
        />
      </Row>
    )
  }, [
    tabKey,
    draftFilter,
    draftData,
    setDraftFilter,
    doneFilter,
    doneData,
    setDoneFilter,
    allFilter,
    allData,
    setAllFilter,
  ])

  return (
    <>
      <SEO title="Feedbacks - Inbox" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Feedbacks',
          },
          {
            label: 'Inbox',
          },
        ]}
      />

      <PageHeader title="Feedbacks" />
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={onTabChange}
        items={[
          {
            key: 'all',
            label: `All (${allFeedbacks.length})`,
            children: (
              <FeedbackInputTable
                data={allFeedbacks}
                isLoading={isAllLoading}
                // onAfterAction={mutate}
              />
            ),
          },
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
          {
            key: 'done',
            label: `Done (${doneFeedbacks.length})`,
            children: (
              <FeedbackInputTable
                data={doneFeedbacks}
                isLoading={isDoneLoading}
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
