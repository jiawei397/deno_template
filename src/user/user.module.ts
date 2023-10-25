import { Module } from "@nest";
import { UserController } from "./user.controller.ts";

@Module({
  imports: [],
  controllers: [
    UserController,
  ],
})
export class UserModule {
}
