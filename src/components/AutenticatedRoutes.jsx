import Home from "../pages/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AutenticatedRoutes = ({ user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ extraData: user }}
      />
    </Stack.Navigator>
  );
};

export default AutenticatedRoutes;
