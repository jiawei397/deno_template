import { Controller, Get } from "@nest";
import { version } from "@/globals.ts";

@Controller("")
export class AppController {
  @Get("/")
  version() {
    return `<html><h2>${version}</h2></html>`;
  }
}
