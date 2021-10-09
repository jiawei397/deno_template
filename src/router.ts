import { UserController } from "./user/user.controller.ts";
import { Router } from "../deps.ts";
import globals from "./globals.ts";
import { formatUrl } from "./tools/utils.ts";

const router = new Router();

// print version
router.get(formatUrl(globals.apiPrefix), async (ctx) => {
  const scriptsConfig = await Deno.readTextFile("scripts.json");
  ctx.response.body = JSON.parse(scriptsConfig).version;
});

router.add(UserController);
router.setGlobalPrefix(globals.apiPrefix);


export default router;
