import { useState } from "react";
export const useLocalStorage = (key, value) => {
  const [storedUser, setStoredUser] = useState(() => {
    let storedValue = localStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue);
      } else {
        localStorage.setItem(key, value);
        return value;
      }
    } catch {
      return value;
    };
  });

  const setUser = (newUser) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setStoredUser(value);
    }
  };

  return [storedUser, setUser];
};
