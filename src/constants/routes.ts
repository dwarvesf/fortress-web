export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  PROJECTS: '/projects',
  ADD_PROJECT: '/projects/new',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  EDIT_PROJECT: (id: string) => `/projects/${id}/edit`,
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
  WORKLOAD: '/feedbacks/workload',
  WORKLOAD_DETAIL: (id: string) => `/feedbacks/workload/${id}`,
  PEER_REVIEW_EVENT_DETAIL: (id: string) => `/feedbacks/peer-review/${id}`,
  EMPLOYEE_PEER_REVIEWS: (id: string, topicId: string) =>
    `/feedbacks/peer-review/${id}/${topicId}`,
  FEEDBACK_INBOX_DETAIL: (id: string) => `/feedbacks/inbox/${id}`,
  EMPLOYEE_ENGAGEMENT_DETAIL: (id: string) => `/feedbacks/engagement/${id}`,
}
