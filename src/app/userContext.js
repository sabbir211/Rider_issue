// UserContext.js
"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
       
      if (currentUser) {
        try {
          const res = await fetch(`/api/storeUser?email=${currentUser.email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            
          });

          const data = await res.json();

          if (res.ok) {
            setUserData({ ...currentUser, ...data }); // includes RiderId, etc.
          } else {
            console.error("Failed to load user details:", data.message);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    }

    fetchUserDetails();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
