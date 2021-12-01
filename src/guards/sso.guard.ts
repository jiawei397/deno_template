/**
 * SSO安全守卫
 */
import { SSOGuard as SSOGuardOrigin } from "jw_utils";
import { logger } from "../tools/log.ts";

export const SSOGuard = SSOGuardOrigin({
  logger,
});
