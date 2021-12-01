import { Controller, Get } from "../deps.ts";
import { readYaml } from "./tools/utils.ts";
import { Scripts } from "./type.ts";

@Controller("")
export class AppController {
  @Get("/")
  async version() {
    const scriptsConfig = await readYaml<Scripts>("scripts.yml");
    return `<html><h2>${scriptsConfig.version}</h2></html>`;
  }
}
