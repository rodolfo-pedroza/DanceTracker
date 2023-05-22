import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const AuthContext = createContext();

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log("user", user);
    });
    return unsubsribe;
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "44072014527-rt4cqevom2qe5uu7l1nfnk3jseea407i.apps.googleusercontent.com",
    expoClientId:
      "44072014527-af9gagksmelb0mkult2855omths9acrv.apps.googleusercontent.com",
  });

  const loginWithGoogle = () => {
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication;
      handleGoogleSignin(idToken, accessToken);
    }
  }, [response]);

  const handleGoogleSignin = async (idToken, accessToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
    } catch (error) {
      console.log("Error signing in with Google!", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.log("Error signing in with password and email!", error);
    }
  };

  const register = async (name, lastname, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${name} ${lastname}`,
      });
      setUser(userCredential.user);
    } catch (error) {
      console.log("Error signing in with password and email!", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("Error signing out!", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loginWithGoogle, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
