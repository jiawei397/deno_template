import { Controller, Get } from "@nest";
import { Scripts } from "./type.ts";
import { parse } from "std/jsonc/mod.ts";

@Controller("")
export class AppController {
  @Get("/")
  async version() {
    const text = await Deno.readTextFile("deno.jsonc");
    const json: Scripts = parse(text);
    return `<html><h2>${json.version}</h2></html>`;
  }
}
