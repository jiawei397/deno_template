import { Context, createParamDecorator } from "../../deps.ts";

export const UserParam = createParamDecorator(
  (ctx: Context) => {
    return (ctx.request as any).userInfo;
  },
);
