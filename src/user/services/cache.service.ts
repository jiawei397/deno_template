import { connect, yellow } from "../../../deps.ts";
import globals from "../../globals.ts";
import { stringify, jsonParse } from "../../tools/utils.ts";
const client = await connect(globals.redis);

console.info('连接到redis', yellow(stringify(globals.redis)));

class CacheService {
    //设置值的方法
    async set(key: string, value: any, seconds?: number) {
        value = stringify(value);
        if (!seconds) {
            await client.set(key, value);
        } else {
            await client.set(key, value, {
                ex: seconds,
            });
        }
    }

    //获取值的方法
    async get(key: string) {
        const data = await client.get(key);
        if (!data) return;
        return jsonParse(data);
    }

    //推送到数组
    async push(key: string, value: any) {
        value = stringify(value);
        await client.rpush(key, value);
    }

    //推送到数组第一项
    async unshift(key: string, value: any) {
        value = JSON.stringify(value);
        await client.lpush(key, value);
    }

    //去掉第一个
    async shift(key: string) {
        const data = await client.lpop(key);
        if (!data) return;
        return jsonParse(data);
    }

    //删除最后一个
    async pop(key: string) {
        const data = await client.rpop(key);
        if (!data) return;
        return jsonParse(data);
    }

    //根据索引获取
    async index(key: string, index: number) {
        const data = await client.lindex(key, index);
        if (!data) return;
        return jsonParse(data);
    }

    async size(key: string) {
        return await client.llen(key);
    }

    async isEmpty(key: string) {
        const len = await this.size(key);
        return len === 0;
    }
}

export const cacheService = new CacheService();