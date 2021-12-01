import * as posix from "path/posix.ts";
import { OakCookie } from "oak_nest";
import { Cache, isDist } from "jw_utils";
import { YamlLoader } from "yaml_loader";

const yamlLoader = new YamlLoader();

const yamlPageCache = new Cache(5 * 60 * 1000);

export async function readYaml<T>(
  path: string,
): Promise<T> {
  const cache = yamlPageCache.get(path);
  if (cache) {
    console.debug(`read yaml [${path}] from cache`);
    return cache;
  }
  let allPath = path;
  if (!/\.(yaml|yml)$/.test(path)) {
    allPath += ".yaml";
  }
  const data = await yamlLoader.parseFile(allPath);
  yamlPageCache.set(path, data);
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
