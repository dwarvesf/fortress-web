export enum EmployeeRelationship {
  LINE_MANAGER = 'line-manager',
  PEER = 'peer',
  CHAPTER_LEAD = 'chapter-lead',
  TEAM_LEAD = 'team-lead',
}

export const employeeRelationship: Record<EmployeeRelationship, string> = {
  [EmployeeRelationship.LINE_MANAGER]: 'Line manager',
  [EmployeeRelationship.PEER]: 'Peer',
  [EmployeeRelationship.CHAPTER_LEAD]: 'Chapter lead',
  [EmployeeRelationship.TEAM_LEAD]: 'Team lead',
}
