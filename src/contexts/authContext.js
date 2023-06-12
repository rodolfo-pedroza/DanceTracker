import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import qs from "qs";
import { makeRedirectUri, startAsync } from "expo-auth-session";

const AuthContext = createContext();

const discovery = {
  authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
  tokenEndpoint: "https://api.fitbit.com/oauth2/token",
  revocationEndpoint: "https://api.fitbit.com/oauth2/revoke",
};

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authToken, setAuthToken] = useState(null);
  const [displayNameUpdated, setDisplayNameUpdated] = useState(false);

  const updateDisplayName = () => {
    setDisplayNameUpdated(!displayNameUpdated);
  };

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("user context", user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubsribe;
  }, []);

  const getFitbitAuthUrl = () => {
    const authUrl = "https://www.fitbit.com/oauth2/authorize";
    const clientId = "23QWSK";
    const redirectUrl = makeRedirectUri({ useProxy: true });
    const scopes = [
      "activity",
      "cardio_fitness",
      "electrocardiogram",
      "heartrate",
      "location",
      "nutrition",
      "oxygen_saturation",
      "profile",
      "respiratory_rate",
      "settings",
      "sleep",
      "social",
      "temperature",
      "weight",
    ];

    const queryParams = qs.stringify({
      client_id: clientId,
      response_type: "token",
      scope: scopes.join(" "),
      redirect_uri: redirectUrl,
      expires_in: "31536000",
    });

    return `${authUrl}?${queryParams}`;
  };

  const handleFitbitAuth = useCallback(async () => {
    console.log("handleFitbitAuth called");
    const authUrl = getFitbitAuthUrl();
    const result = await startAsync({ authUrl });

    if (result.type === "success") {
      setAuthToken(result.params.access_token);
    }
    console.log("result", result);
    console.log("authToken", authToken);
  }, [authToken]);

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
      await userCredential.user.reload();
      setUser(userCredential.user);
      updateDisplayName();
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
      value={{
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        loading,
        authToken,
        handleFitbitAuth,
        updateDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
