import { NestFactory } from "@nest";
import { HonoRouter as Router } from "@nest/hono";
import { anyExceptionFilter } from "@nest/uinv";
import { AppModule } from "./app.module.ts";
import { logger } from "./tools/log.ts";
import globals, { version } from "./globals.ts";

const app = await NestFactory.create(AppModule, Router);
app.setGlobalPrefix(globals.apiPrefix);

app.useGlobalFilters(anyExceptionFilter({
  logger,
}));

app.get("/healthz", (_req, res) => {
  res.status = 204;
});

addEventListener("unhandledrejection", (evt) => {
  evt.preventDefault();
  logger.error(`unhandledrejection`, evt.reason);
});

addEventListener("error", (evt) => {
  evt.preventDefault(); // 这句很重要
  logger.error(`global error`, evt.error);
});

await app.listen({
  port: globals.port,
  onListen: ({ hostname, port }) => {
    logger.info(
      `app start with version ${version}: http://${hostname}:${port}`,
    );
  },
});
