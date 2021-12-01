import { getLogger, initLog } from "date_file_log";
import { logTime } from "jw_utils";
import globals from "../globals.ts";

await initLog(globals.log);

export const logger = getLogger();

export const LogTime = (str: string) => {
  return logTime(str, { logger });
};
