/**
 * SSO安全守卫
 */
import { SSOGuardOrigin } from "../../deps.ts";
import { logger } from "../tools/log.ts";

export const SSOGuard = SSOGuardOrigin({
  logger,
});
