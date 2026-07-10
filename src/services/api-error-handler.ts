import logger from "@/utils/logger";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import i18n from "@/i18n";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    logger.error(action.error as Error);

    toast.error(i18n.t("toast.apiError"));
  }

  return next(action);
};
