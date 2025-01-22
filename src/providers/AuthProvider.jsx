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
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  // for user management
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

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

      console.log("current user from auth", currentUser?.email);
      if (currentUser && currentUser?.email) {
        //console.log("jwt post");
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          // console.log(
          //   "posting to jwt for the current user",
          //   currentUser?.email
          // );
          if (res?.data?.token) {
            localStorage.setItem("access-token", res.data.token);

            //console.log("token found from jwt", res.data.token);
            //console.log(
            //  "getting from localstorage",
            //   localStorage.getItem("access-token")
            // );

            setLoading(false);
            //console.log("loading after setting it to false", loading);
            setToken(res.data.token);
          } else {
            //console.log("no-token-found in onAuthStateChanged");
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setToken("");

        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

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
    token,
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
