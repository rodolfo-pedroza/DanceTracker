import { Routes, Route } from "react-router-native";
import Home from "../pages/Home";

const AutenticatedRoutes = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Home  />} />
    </Routes>
  );
};

export default AutenticatedRoutes;