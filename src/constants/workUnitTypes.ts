export enum WorkUnitType {
  DEVELOPMENT = 'development',
  MANAGEMENT = 'management',
  TRAINING = 'training',
  LEARNING = 'learning',
}

export const workUnitTypes: Record<WorkUnitType, string> = {
  [WorkUnitType.DEVELOPMENT]: 'Development',
  [WorkUnitType.MANAGEMENT]: 'Management',
  [WorkUnitType.TRAINING]: 'Training',
  [WorkUnitType.LEARNING]: 'Learning',
}
