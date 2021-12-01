import { Context, createParamDecorator } from "oak_nest";

export const UserParam = createParamDecorator(
  (ctx: Context) => {
    // deno-lint-ignore no-explicit-any
    return (ctx.request as any).userInfo;
  },
);
