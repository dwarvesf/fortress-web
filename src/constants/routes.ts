export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  ADD_PROJECT: '/projects/new',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  EMPLOYEES: '/employees',
  ADD_EMPLOYEE: '/employees/new',
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,
  EDIT_EMPLOYEE: (id: string) => `/employees/${id}/edit`,
  FEEDBACKS: '/feedbacks',
  CONFIG: '/config',
  PROFILE: '/profile',
  INBOX: '/feedbacks/inbox',
  PEER_REVIEW: '/feedbacks/peer-review',
  ENGAGEMENT: '/feedbacks/engagement',
  WORK: '/feedbacks/work',
  WORK_DETAIL: (id: string) => `/feedbacks/work/${id}`,
  PEER_REVIEW_EVENT_DETAIL: (id: string) => `/feedbacks/peer-review/${id}`,
  EMPLOYEE_PEER_REVIEWS: (id: string, topicId: string) =>
    `/feedbacks/peer-review/${id}/${topicId}`,
  FEEDBACK_INBOX_DETAIL: (id: string) => `/feedbacks/inbox/${id}`,
  EMPLOYEE_ENGAGEMENT_DETAIL: (id: string) => `/feedbacks/engagement/${id}`,
}
