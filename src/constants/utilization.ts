export enum Utilization {
  OFFICIAL = 'official',
  SHADOW = 'shadow',
  AVAILABLE = 'available',
}

export const utilizations: Record<Utilization, string> = {
  [Utilization.OFFICIAL]: 'Official',
  [Utilization.SHADOW]: 'Shadow',
  [Utilization.AVAILABLE]: 'Available',
}
