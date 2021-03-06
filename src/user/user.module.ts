import { Module } from "oak_nest";
// import { SchemaFactory } from "deno_mongo_schema";
// import { User } from "./schemas/user.schema.ts";
import { UserController } from "./user.controller.ts";

@Module({
  imports: [
    // SchemaFactory.forFeature([ // 如果不打算给User表取别名，就不用写这个
    //   { name: User.name, schema: User },
    // ]),
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule {
}
