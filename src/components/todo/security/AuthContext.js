/* eslint-disable linebreak-style */
import { createContext, useContext, useState } from 'react';
import { executeJwtAuthenticationService } from '../api/AuthenticationApiService';
import { apiClient } from '../api/ApiClient';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // async function login(username, password) {
  //   // const basicToken = 'Basic ' + window.btoa( username + ':' + password );

  //   try {
  //     // const response = await executeBasicAuthenticationService(basicToken);

  //     const response = await executeBasicAuthenticationService(username, password);
  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       setUsername(username);
  //       const basicToken = window.btoa(`${username}:${password}`);
  //       setToken(basicToken);

  //       apiClient.interceptors.request.use((config) => {
  //         console.log('intercepting and adding a token');
  //         config.headers.Authorization = `Basic ${basicToken}`;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       loggout();
  //       return false;
  //     }
  //   } catch (error) {
  //     loggout();
  //     return false;
  //   }
  // }

  async function login(username, password) {
    // const basicToken = 'Basic ' + window.btoa( username + ':' + password );

    try {
      // const response = await executeBasicAuthenticationService(basicToken);

      const response = await executeJwtAuthenticationService(username, password);
      if (response.status === 200) {
        const jwtToken = 'Bearer ' + response.data.token;

        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log('intercepting and adding a token');
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        loggout();
        return false;
      }
    } catch (error) {
      loggout();
      return false;
    }
  }

  function loggout() {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loggout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
  // eslint-disable-next-line linebreak-style
}
