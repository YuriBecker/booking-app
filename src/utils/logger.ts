// In production environment, we can use a different logger like logrocket
const currentLogger = console;

const logger = {
  info: (message: string) => {
    currentLogger.info(message);
  },
  error: (error: Error) => {
    currentLogger.error(error);
  },
  log: (message: string) => {
    currentLogger.log(message);
  },
  warn: (message: string) => {
    currentLogger.warn(message);
  },
};

export default logger;
