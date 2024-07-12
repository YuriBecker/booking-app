import routerPaths from "@/router/paths";
import { Navigate } from "react-router-dom";

const NotFound = () => {
  return <Navigate to={routerPaths.home} replace />;
};

export default NotFound;
