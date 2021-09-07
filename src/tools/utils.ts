import { OakCookie, YamlLoader } from "../../deps.ts";

export function isDist(): boolean {
  return Deno.env.get("NODE_ENV") === "production";
}

export class Cache extends Map {
  private timeout: number;

  constructor(timeout: number = 5 * 1000) {
    super();
    this.timeout = timeout;
  }

  set(key: string | number, val: any) {
    super.set.call(this, key, val);
    setTimeout(() => {
      this.delete(key);
    }, this.timeout);
    return this;
  }
}

const yamlLoader = new YamlLoader();

const yamlPageCache = new Cache(5 * 60 * 1000);

export async function readYaml(path: string) {
  try {
    const cache = yamlPageCache.get(path);
    if (cache) {
      console.debug(`read yaml [${path}] from cache`);
      return cache;
    }
    const data = await yamlLoader.parseFile(`${path}.yaml`);
    yamlPageCache.set(path, data);
    return data;
  } catch (err) {
    console.warn(`读取YAML[${path}.yaml]错误: ${err.message}`);
  }
}

export function makeID(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/** 单位是秒 */
export function getExpireMaxAge(day: number): number {
  return day * 24 * 60 * 60;
}

export function expireDate(day: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + day);
  return date;
}

/** 单位是ms */
export function expireTime(day: number): number {
  return Date.now() + getExpireMaxAge(day * 1000);
}

export function stringify(data: any): string {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return data;
  }
}

export function jsonParse(str: string): any {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

export const cookie = {
  set(
    cookies: OakCookie,
    key: string,
    value: string,
    maxAge = 60, // 单位是秒
    domain?: string,
  ): void {
    cookies.set(key, value, {
      httpOnly: true,
      sameSite: "lax",
      secure: isDist(),
      // signed: true,
      maxAge,
      domain,
    });
  },

  clear(cookies: OakCookie, key: string, domain?: string): void {
    cookies.set(key, "", {
      maxAge: 0,
      domain,
    });
  },

  get(cookies: OakCookie, key: string): any {
    return cookies.get(key);
  },
};
