import { Module } from "@nest";
import { MongoModule } from "@nest/mongo";
import { AppController } from "./app.controller.ts";
import globals from "./globals.ts";
import { UserModule } from "./user/user.module.ts";

@Module({
  imports: [
    MongoModule.forRoot(globals.db),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
