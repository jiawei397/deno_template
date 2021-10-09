/**
 * 供外部接口调用的简单防御，只校验token值
 */
import { SSOGuard as SSOGuardOrigin } from "../../deps.ts";
import { logger } from '../tools/log.ts';

export const SSOGuard = SSOGuardOrigin({
  logger,
});
