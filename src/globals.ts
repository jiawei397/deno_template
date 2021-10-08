import { DateFileLogConfig } from "../deps.ts";
import { readYaml } from "./tools/utils.ts";

export type Config = {
  apiPrefix: string;
  db: string;
  port: number;
  staticPath?: string; //静态资源路径
  log: DateFileLogConfig; //log4js配置
  ssoApi?: string; // sso的api地址，最近一个字符得是/
  ssoUserAgent?: string; // sso需要设置的userAgent
  redis: {
    hostname: string;
    port: number;
  };
};

const config = await readYaml("config/server") as Config;

if (!config) {
  Deno.exit(1);
}

export default config;

export const version = "0.0.2";
