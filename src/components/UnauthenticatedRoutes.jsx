import { Routes, Route } from "react-router-native";
import LoginPage from "../pages/Login";
import RegistrationPage from "../pages/Registration";

const UnauthenticatedRoutes = ({setUser}) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/RegistrationPage" element={<RegistrationPage setUser={setUser} />} />
    </Routes>
  );
}; 

export default UnauthenticatedRoutes;