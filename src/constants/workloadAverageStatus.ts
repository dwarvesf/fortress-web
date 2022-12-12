export enum WorkloadAverageStatuses {
  ALL_BORING_STUFF = 'all-boring-stuff',
  NOTHING_NEW = 'nothing-new',
  NOT_MUCH = 'not-much',
  FEW_THINGS = 'few-things',
  A_LOT = 'a-lot',
}

export const workloadAverageStatuses: Record<WorkloadAverageStatuses, string> =
  {
    [WorkloadAverageStatuses.ALL_BORING_STUFF]: 'All boring stuff',
    [WorkloadAverageStatuses.NOTHING_NEW]: 'Nothing new',
    [WorkloadAverageStatuses.NOT_MUCH]: 'Not much',
    [WorkloadAverageStatuses.FEW_THINGS]: 'Few things',
    [WorkloadAverageStatuses.A_LOT]: 'A lot',
  }
