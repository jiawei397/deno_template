import * as posix from "std/path/posix.ts";
import { OakCookie } from "oak_nest";
import { isDist } from "utils";
import { YamlLoader } from "yaml_loader";

export async function readYaml<T>(path: string): Promise<T> {
  let allPath = path;
  if (!/\.(yaml|yml)$/.test(path)) {
    allPath += ".yaml";
  }
  const yamlLoader = new YamlLoader();
  const data = await yamlLoader.parseFile(allPath);
  return data as T;
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

  get(cookies: OakCookie, key: string) {
    return cookies.get(key);
  },
};

export function formatUrl(url: string) {
  return posix.join("/", url);
}
