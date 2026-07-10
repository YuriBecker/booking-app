import NotFound from "@/pages/NotFound";
import logger from "@/utils/logger";
import { useRouteError } from "react-router-dom";
import { toast } from "sonner";
import i18n from "@/i18n";

const RouteErrorBoundary = () => {
  const error = useRouteError() as Error;

  logger.error(error);

  toast.error(i18n.t("toast.genericError"));

  return <NotFound />;
};

export default RouteErrorBoundary;
