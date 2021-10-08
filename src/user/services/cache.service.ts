import { RedisService } from "../../../deps.ts";
import globals from "../../globals.ts";

export const cacheService = new RedisService(globals.redis);
