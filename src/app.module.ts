import { Module } from "oak_nest";
import { MongoFactory } from "deno_mongo_schema";
import { AppController } from "./app.controller.ts";
import globals from "./globals.ts";
import { UserModule } from "./user/user.module.ts";

@Module({
  imports: [
    MongoFactory.forRoot(globals.db),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
