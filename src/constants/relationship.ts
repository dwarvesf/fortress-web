export enum MemberRelationship {
  LINE_MANAGER = 'line-manager',
  PEER = 'peer',
  CHAPTER_LEAD = 'chapter-lead',
  TEAM_LEAD = 'team-lead',
}

export const memberRelationship: Record<MemberRelationship, string> = {
  [MemberRelationship.LINE_MANAGER]: 'Line manager',
  [MemberRelationship.PEER]: 'Peer',
  [MemberRelationship.CHAPTER_LEAD]: 'Chapter lead',
  [MemberRelationship.TEAM_LEAD]: 'Team lead',
}
