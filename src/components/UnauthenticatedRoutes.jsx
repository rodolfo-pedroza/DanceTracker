import { Routes, Route } from "react-router-native";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const UnauthenticatedRoutes = ({setUser}) => {
  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/registration" element={<Registration setUser={setUser} />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;