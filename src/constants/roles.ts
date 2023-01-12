import { ROUTES } from './routes'

export enum Role {
  ADMIN = 'Engineering Manager',
}

// the role that needs to access to a certain page
export const pageRoles = {
  [ROUTES.DASHBOARD]: Role.ADMIN,
}
