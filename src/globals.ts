import { readYaml } from "./tools/utils.ts";
import { Config } from "./type.ts";

const config = await readYaml<Config>("config/server.yaml");

if (!config) {
  Deno.exit(1);
}

if (config.ssoApi) {
  Deno.env.set("ssoApi", config.ssoApi);
}

if (config.ssoUserAgent) {
  Deno.env.set("ssoUserAgent", config.ssoUserAgent);
}

export default config;
