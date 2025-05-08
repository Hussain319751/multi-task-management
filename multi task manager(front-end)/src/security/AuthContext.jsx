// import React, { createContext, useContext, useState } from "react";
// import { executeBasicAuthService } from "../api/HelloWorldapiService";

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [isAuth, setIsAuth] = useState(false);

//   const [username, setUsername] = useState(null);
//   const [token, setToken] = useState(null);

//   // function login(username, password) {
//   //   if (username == "chinna" && password == "123") {
//   //     setIsAuth(true);
//   //     setUsername(username);
//   //     return true;
//   //   } else {
//   //     setIsAuth(false);
//   //     setUsername(null);
//   //     return false;
//   //   }
//   // }

//   async function login(username, password) {
//     const batoken = "Basic " + window.btoa(username + ":" + password);

//     const response = await executeBasicAuthService(batoken);

//     try {
//       if (response.data == 200) {
//         setToken(batoken);
//         setIsAuth(true);
//         setUsername(username);

//         apiClient.interceptors.request.use((config) => {
//           console.log("intercepitng token");
//           config.headers.Authorization = batoken;
//           return config;
//         });

//         return true;
//       } else {
//         logout();
//         return false;
//       }
//     } catch (err) {
//       logout();
//       return false;
//     }
//   }

//   function logout() {
//     setToken(null);
//     setIsAuth(false);
//     setUsername(null);
//   }

//   return (
//     <AuthContext.Provider value={{ isAuth, login, logout, username, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import React, { createContext, useContext, useState } from "react";
import { executeBasicAuthService } from "../api/HelloWorldapiService";
import { apiClinet } from "../api/apiClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    const batoken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthService(batoken);

      if (response.status === 200) {
        setToken(batoken);
        setIsAuth(true);
        setUsername(username);

        // Set up interceptor
        apiClinet.interceptors.request.use((config) => {
          console.log("Adding token to headers");
          config.headers.Authorization = batoken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      logout();
      return false;
    }
  }

  function logout() {
    setToken(null);
    setIsAuth(false);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
