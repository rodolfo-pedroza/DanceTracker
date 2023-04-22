import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/contexts/authContext";
import Routes from "./src/components/Routes";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
