import { UserController } from "./user/user.controller.ts";
import { Router } from "../deps.ts";
import globals from "./globals.ts";
import { formatUrl, readYaml } from "./tools/utils.ts";

const router = new Router();

// print version
router.get(formatUrl(globals.apiPrefix), async (ctx) => {
  const scriptsConfig = await readYaml("scripts.yml");
  ctx.response.body = scriptsConfig.version;
});

router.get("/healthz", (ctx) => {
  ctx.response.body = "ok";
});

router.add(UserController);
router.setGlobalPrefix(globals.apiPrefix);

export default router;
