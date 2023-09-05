import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const serverURL = "http://192.168.1.109:8000/server.php";

  useEffect(() => {

    axios
      .get(`${serverURL}?req=contacts`)
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        } else {
          console.error("Error fetching data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return (
    <UserContext.Provider value={{ users, setUsers,serverURL }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
