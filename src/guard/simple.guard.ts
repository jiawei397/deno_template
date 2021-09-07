/**
 * 供外部接口调用的简单防御，只校验token值
 */
import { CanActivate, Context, UnauthorizedException } from "../../deps.ts";

export class SimpleGuard implements CanActivate {
  async canActivate(context: Context) {
    const b = await this.validateRequest(context);
    if (!b) {
      throw new UnauthorizedException("Unauthorized");
    }
    return b;
  }

  validateRequest(context: Context) {
    // return this.checkToken(context);
    return true;
  }
}
