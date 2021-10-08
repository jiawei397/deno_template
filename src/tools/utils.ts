import { Cache, isDist, OakCookie, YamlLoader } from "../../deps.ts";

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
