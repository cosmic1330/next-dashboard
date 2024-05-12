import Redis, { RedisOptions } from 'ioredis';

function getRedisConfigurationOptions(host: string, port: number) {
  const options: RedisOptions = {
    host,
    port,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (times: number) => {
      if (times > 3) {
        console.warn(`[Redis] Could not connect after ${times} attempts`);
        return null;
      }

      return Math.min(times * 200, 1000);
    },
  };
  return options;
}
class RedisHelper {
  redis: Redis | null;

  constructor(options: RedisOptions) {
    this.redis = new Redis(options);
    this.redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });
  }
}

let redis: Redis | null = null;
const host = process.env.REDIS_HOST as string;
const port = parseInt(process.env.REDIS_PORT as string, 10);
if (host && port) {
  const options = getRedisConfigurationOptions(host, port);
  const redisHelper = new RedisHelper(options);
  redis = redisHelper.redis;
}

export default redis;
