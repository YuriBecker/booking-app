import NotFound from "@/pages/NotFound";
import logger from "@/utils/logger";
import { useRouteError } from "react-router-dom";

const RouteErrorBoundary = () => {
  const error = useRouteError() as Error;

  logger.error(error);

  return <NotFound />;
};

export default RouteErrorBoundary;
