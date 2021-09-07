import { UserController } from "./user/user.controller.ts";
import { Router } from "../deps.ts";
import globals, { version } from "./globals.ts";

const router = new Router();

router.get(globals.apiPrefix, (ctx) => {
  ctx.response.body = version;
});

router.add(UserController);
router.setGlobalPrefix(globals.apiPrefix);

export default router;
