import Home from "../pages/Home";
import CompleteProfile from "../pages/CompleteProfile";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AutenticatedRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
    </Stack.Navigator>
  );
};

export default AutenticatedRoutes;
