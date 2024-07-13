import NotFound from "@/pages/NotFound";
import logger from "@/utils/logger";
import { useRouteError } from "react-router-dom";
import { toast } from "sonner";

const RouteErrorBoundary = () => {
  const error = useRouteError() as Error;

  logger.error(error);

  toast.error("Opps! Something went wrong.");

  return <NotFound />;
};

export default RouteErrorBoundary;
