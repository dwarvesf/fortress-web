export enum AuditGroupTypes {
  ENGINEERING_HEALTH = 'engineering-health',
  AUDIT = 'audit',
}

export const auditGroupNames = {
  [AuditGroupTypes.ENGINEERING_HEALTH]: [
    'delivery',
    'quality',
    'collaboration',
    'feedback',
  ],
  [AuditGroupTypes.AUDIT]: [
    'frontend',
    'backend',
    'system',
    'process',
    'mobile',
    'blockchain',
  ],
}
