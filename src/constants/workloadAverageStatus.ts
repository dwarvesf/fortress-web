export enum WorkloadAverageStatus {
  ALL_BORING_STUFF = 'all-boring-stuff',
  NOTHING_NEW = 'nothing-new',
  NOT_MUCH = 'not-much',
  FEW_THINGS = 'few-things',
  A_LOT = 'a-lot',
}

export const workloadAverageStatuses: Record<WorkloadAverageStatus, string> = {
  [WorkloadAverageStatus.ALL_BORING_STUFF]: 'All boring stuff',
  [WorkloadAverageStatus.NOTHING_NEW]: 'Nothing new',
  [WorkloadAverageStatus.NOT_MUCH]: 'Not much',
  [WorkloadAverageStatus.FEW_THINGS]: 'Few things',
  [WorkloadAverageStatus.A_LOT]: 'A lot',
}
