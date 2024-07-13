import logger from "@/utils/logger";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    logger.error(action.error as Error);

    toast.error("Opps! Something went wrong. Please try again later.");
  }

  return next(action);
};
