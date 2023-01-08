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

// TODO: Clarify this & work unit types
export enum ProjectFunction {
  DEVELOPMENT = 'development',
  LEARNING = 'learning',
  TRAINING = 'training',
  MANAGEMENT = 'management',
}

export const projectFunctions: Record<ProjectFunction, string> = {
  [ProjectFunction.DEVELOPMENT]: 'Development',
  [ProjectFunction.LEARNING]: 'Learning',
  [ProjectFunction.TRAINING]: 'Training',
  [ProjectFunction.MANAGEMENT]: 'Management',
}
