import { parse as parseYaml } from "std/yaml/mod.ts";

export async function loadYaml<T = unknown>(path: string) {
  const str = await Deno.readTextFile(path);
  return parseYaml(str) as T;
}

export async function readYaml<T>(path: string): Promise<T> {
  let allPath = path;
  if (!/\.(yaml|yml)$/.test(path)) {
    allPath += ".yaml";
  }
  const data = await loadYaml(allPath);
  return data as T;
}
