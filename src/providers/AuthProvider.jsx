import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  // for user management
  const [user, setUser] = useState(null);
  //console.log(user);
  // for preventing private route refresh
  const [loading, setLoading] = useState(true);
  //console.log(loading);
  // sign up with email and pass
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //logging in with google
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //update profile
  const updateUserProfile = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };
  //setting observer on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("authprovider", currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  //theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const authInfo = {
    signUp,
    signIn,
    logOut,
    user,
    setUser,
    loading,
    setLoading,
    googleSignIn,
    updateUserProfile,
    theme,
    setTheme,
  };
  //console.log(typeof children);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
//prop-type validation
AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
