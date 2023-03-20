import { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";


const AuthContext = createContext({ });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
        return setUser(user);
    });
    return () => logout();
  }, []);

  const userSignin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const userSignup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    console.log('logout');
    navigate('/login');
    return await signOut(auth);
  };
  const value = {
    user,
    userSignin,
    userSignup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
