export enum ProjectType {
  DWARVES = 'dwarves',
  FIXED_COST = 'fixed-cost',
  TIME_MATERIAL = 'time-material',
}

export const projectTypes: Record<ProjectType, string> = {
  [ProjectType.DWARVES]: 'Dwarves',
  [ProjectType.FIXED_COST]: 'Fixed cost',
  [ProjectType.TIME_MATERIAL]: 'Time material',
}
