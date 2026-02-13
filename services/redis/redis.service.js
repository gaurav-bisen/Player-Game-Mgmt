import client from '../../libs/redis.js'


class cacheService {
    async setCache(key, value, ttl=3600) {
        await client.set(key, JSON.stringify(value), {
            EX: ttl
        });
    }

    // async expireCache(key, ttl = 3600) {
    //     await client.expire(key, ttl);
    // }

    async getCache(key) {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async deleteCache(key) {
        await client.del(key);
    }

    async deleteCacheByPattern(pattern){
        const keys = await client.keys(pattern);

        if(keys.length > 0){
            await client.del(keys);
        }
    }
}

export default new cacheService();