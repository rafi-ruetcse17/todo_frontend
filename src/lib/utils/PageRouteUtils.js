export const appRouteList = {
  authPage: "/auth",
  login: "/auth?authState=login",
  signup: "/auth?authState=signup",
  user: "/user",
  createApp: "/user/apps/create",
  tasks: (appId) => `/user/${appId}/tasks`,
  paginatedTasks: (appId, pageNumber) => `/user/${appId}/tasks/${pageNumber}`,
  createTask: (appId) => `/user/${appId}/tasks/create`,
  editTask: (appId, taskId) => `/user/${appId}/tasks/edit/${taskId}`,
};
