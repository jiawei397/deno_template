import { readYaml } from "./tools/utils.ts";
import { Config } from "./type.ts";

const config = await readYaml<Config>("config/server.yaml");

export default config;
