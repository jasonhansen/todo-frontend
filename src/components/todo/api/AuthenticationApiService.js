import { apiClient } from './ApiClient';

// export const executeBasicAuthenticationService = (token) =>
//   apiClient.get(`/basicauth`, {
//     headers: {
//       Authorization: token
//     }
//   });

export const executeBasicAuthenticationService = (username, password) => {
  const token = window.btoa(`${username}:${password}`); // Create the token here
  return apiClient.get(`/basicauth`, {
    headers: {
      Authorization: `Basic ${token}` // Use the constructed Basic auth header
    }
  });
};

export const executeJwtAuthenticationService = (username, password) =>
  apiClient.post(`/authenticate`, {
    username,
    password
  });
