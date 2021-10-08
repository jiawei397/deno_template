// deno bundle main.ts | esbuild --minify > main.min.js
import globals from "./globals.ts";
import { logger } from "./tools/log.ts";

import { anyExceptionFilter, Application, Context } from "../deps.ts";
import myRouter from "./router.ts";

const app = new Application();

// setInterval(() => {
//   console.log(Deno.systemMemoryInfo());
// }, 10000);

app.use(anyExceptionFilter({
  logger,
  isHeaderResponseTime: false
}));

app.use(myRouter.routes());

const port = globals.port;
logger.info(`app start with: http://localhost:${port}`);
await app.listen({ port });
