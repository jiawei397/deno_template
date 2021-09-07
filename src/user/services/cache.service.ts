import { connect } from "https://deno.land/x/redis/mod.ts";
import globals from "../../globals.ts";
const client = await connect(globals.redis);

export class CacheService {
    //设置值的方法
    async set(key: string, value: any, seconds?: number) {
        value = JSON.stringify(value);
        if (!seconds) {
            await client.set(key, value);
        } else {
            await client.set(key, value, {

            });
        }
    }

    //推送到数组
    async push(key: string, value: any) {
        value = JSON.stringify(value);
        if (!client) {
            await this.getClient();
        }
        await client.lpush(key, value);
    }

    //去掉第一个
    async shift(key: string) {
        if (!client) {
            await this.getClient();
        }
        const data = await client.lpop(key);
        if (!data) return;
        return JSON.parse(data);
    }

    //删除最后一个
    async pop(key: string) {
        if (!client) {
            await this.getClient();
        }
        const data = await client.rpop(key);
        if (!data) return;
        return JSON.parse(data);
    }

    //根据索引获取
    async index(key: string, index: number) {
        if (!client) {
            await this.getClient();
        }
        const data = await client.lindex(key, index);
        if (!data) return;
        return JSON.parse(data);
    }

    //获取值的方法
    async get(key: string) {
        if (!client) {
            await this.getClient();
        }
        const data = await client.get(key);
        if (!data) return;
        return JSON.parse(data);
    }
}
