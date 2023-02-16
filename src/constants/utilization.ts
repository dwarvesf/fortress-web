export enum Utilization {
  STAFFED = 'staffed',
  INTERNAL = 'internal',
  AVAILABLE = 'available',
}

export const utilizations: Record<Utilization, string> = {
  [Utilization.STAFFED]: 'Staffed',
  [Utilization.INTERNAL]: 'Internal',
  [Utilization.AVAILABLE]: 'Available',
}
