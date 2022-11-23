export type DeploymentType = 'official' | 'shadow'

export const deploymentTypes: Record<DeploymentType, string> = {
  official: 'Official',
  shadow: 'Shadow',
}
