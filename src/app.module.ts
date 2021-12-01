import { Module, MongoFactory } from "../deps.ts";
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
