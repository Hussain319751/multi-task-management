import { apiClinet } from "./apiClient";

export const retriveHelloworldBean = () => apiClinet.get("/hello-world-bean");

export const executeBasicAuthService = (token) =>
  apiClinet.get("/basic-auth", {
    headers: {
      Authorization: token,
    },
  });
