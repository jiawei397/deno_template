import { Module, MongoFactory } from "../../deps.ts";
import { User } from "./schemas/user.schema.ts";
import { UserController } from "./user.controller.ts";

@Module({
  imports: [
    MongoFactory.forFeature([ // 如果不打算给User表取别名，就不用写这个
      { name: User.name, schema: User },
    ]),
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule {
}
