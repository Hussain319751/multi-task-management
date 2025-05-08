import { apiClinet } from "./apiClient";

export const retriveTodosApi = (username) =>
  apiClinet.get(`/users/${username}/todos`);

export const deleteTodoApi = (username, id) =>
  apiClinet.delete(`/users/${username}/todos/${id}`);

export const retriveTodoApi = (username, id) =>
  apiClinet.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todo) =>
  apiClinet.put(`/users/${username}/todos/${id}`, todo);

export const createTodoApi = (username, todo) =>
  apiClinet.post(`/users/${username}/todos`, todo);
