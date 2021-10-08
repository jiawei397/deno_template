// deno bundle main.ts | esbuild --minify > main.min.js
import globals from "./globals.ts";
import { logger } from "./tools/log.ts";
import { anyExceptionFilter, Application } from "../deps.ts";
import router from "./router.ts";

const app = new Application();

// must before router
app.use(anyExceptionFilter({
  logger,
  isHeaderResponseTime: false,
}));

app.use(router.routes());

const port = Number(Deno.env.get('PORT') || globals.port);
logger.info(`app start with: http://localhost:${port}`);
await app.listen({ port });
