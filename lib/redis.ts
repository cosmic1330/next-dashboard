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

let redis: Redis | null = null;
if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT, 10);
  const options = getRedisConfigurationOptions(host, port);
  redis = new Redis(options);
}

export default redis;
