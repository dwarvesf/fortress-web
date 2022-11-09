export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  PROJECTS: '/projects',
  EMPLOYEES: '/employees',
  FEEDBACKS: '/feedbacks',
  CONFIG: '/config',
  ADD_EMPLOYEE: '/employees/new',
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,
}
