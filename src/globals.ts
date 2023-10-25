import { parse } from "std/jsonc/mod.ts";
import { readYaml } from "./tools/utils.ts";
import { Config, Scripts } from "./type.ts";

const config = await readYaml<Config>("config.yaml");

async function getVersion(): Promise<string> {
  const text = await Deno.readTextFile("deno.jsonc");
  const json: Scripts = parse(text);
  return json.version;
}

export const version = Deno.env.get("VERSION") || await getVersion();

export default config;
