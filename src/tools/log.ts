import { getLogger, initLog } from "../../deps.ts";
import globals from "../globals.ts";

await initLog(globals.log);

export const logger = getLogger();
