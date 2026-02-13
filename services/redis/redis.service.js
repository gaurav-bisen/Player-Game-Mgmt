import connection from '../../libs/redis.js'


class cacheService {
    async setCache(key, value, ttl=3600) {
        await connection.set(key, JSON.stringify(value), 
            "EX", ttl
        );
    }

    // async expireCache(key, ttl = 3600) {
    //     await connection.expire(key, ttl);
    // }

    async getCache(key) {
        const data = await connection.get(key);
        return data ? JSON.parse(data) : null;
    }

    async deleteCache(key) {
        await connection.del(key);
    }

    async deleteCacheByPattern(pattern){
        const keys = await connection.keys(pattern);

        if(keys.length > 0){
            await connection.del(...keys);
        }
    }
}

export default new cacheService();