import { AppModule } from "./app.module.ts";
import { logger } from "./tools/log.ts";
import { anyExceptionFilter, NestFactory } from "../deps.ts";
import globals from "./globals.ts";

const app = await NestFactory.create(AppModule);

// must before router
app.use(anyExceptionFilter({
  logger,
  isHeaderResponseTime: false,
}));

app.get("/healthz", (ctx) => {
  ctx.response.body = "ok";
});

app.setGlobalPrefix(globals.apiPrefix);

app.use(app.routes());

const port = Number(Deno.env.get("PORT") || globals.port);
logger.info(`app start with: http://localhost:${port}`);
await app.listen({ port });
