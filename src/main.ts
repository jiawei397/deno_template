// deno bundle main.ts | esbuild --minify > main.min.js
import globals from "./globals.ts";
import { logger } from "./tools/log.ts";

import { Application, Context } from "../deps.ts";
import myRouter from "./router.ts";

const app = new Application();

// setInterval(() => {
//   console.log(Deno.systemMemoryInfo());
// }, 10000);

app.use(async (ctx: Context, next: () => void) => {
  const start = Date.now();
  try {
    await next();
    // 在这里可以很方便地拦截处理响应给前台的数据
    if (ctx.response.body === undefined && ctx.response.status === 404) {
      ctx.response.body = "not found";
      ctx.response.status = 404; // TODO 这里需要重新赋一下，否则状态码变成200了
    }
  } catch (err) {
    logger.error(err);
    ctx.response.status = err.status || 500;
    ctx.response.body = err.message;
  } finally {
    const ms = Date.now() - start;
    logger.debug(
      `${ctx.request.method} ${ctx.request.url} [${ctx.response.status}] - ${ms}ms`,
    );
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  }
});

app.use(myRouter.routes());

const port = Number(Deno.env.get("PORT") || globals.port);
logger.info(`app will start with: http://localhost:${port}`);
await app.listen({ port });
