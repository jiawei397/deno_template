import { DateFileLogConfig } from "date_file_log";

// 添加interface或type
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

export type Scripts = {
  version: string;
};
