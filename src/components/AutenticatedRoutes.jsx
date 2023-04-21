import { Routes, Route } from "react-router-native";
import Home from "../pages/Home";
import Main from "./Main";

const AutenticatedRoutes = ({}) => {
  return (
    <Routes>
      <Route path="/*" element={<Main  />} />
    </Routes>
  );
};

export default AutenticatedRoutes;