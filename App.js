import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import Login from "./src/pages/Login";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
}
