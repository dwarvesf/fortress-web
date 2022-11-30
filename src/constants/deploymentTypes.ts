export enum DeploymentType {
  OFFICIAL = 'official',
  SHADOW = 'shadow',
}

export const deploymentTypes: Record<DeploymentType, string> = {
  [DeploymentType.OFFICIAL]: 'Official',
  [DeploymentType.SHADOW]: 'Shadow',
}
