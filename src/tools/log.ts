import { getLogger, initLog, logTime } from "../../deps.ts";
import globals from "../globals.ts";

await initLog(globals.log);

export const logger = getLogger();

export const LogTime = (str: string) => {
  return logTime(str, { logger });
};
