// UserContext.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          // console.log("🔑 Firebase token:", token);

          const res = await fetch(`/api/storeUser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          // console.log("✅ User data:", data);

          if (res.ok) {
            setUserData({
              firebase: currentUser,
              db: data, // contains role, user_id, etc.
            });
          } else {
            console.error("❌ Failed to load user data:", data);
          }
        } catch (err) {
          console.error("🚨 Error fetching user info:", err);
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
