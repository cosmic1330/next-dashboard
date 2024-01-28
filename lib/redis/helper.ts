import Redis, { RedisOptions } from 'ioredis';

function getRedisConfiguration() {
  return {
    port: process.env.REDIS_PORT as string,
    host: process.env.REDIS_HOST as string,
  };
}

function createRedisInstance({ port, host } = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (port) {
      options.port = parseInt(port, 10);
    }

    const redis = new Redis(options);

    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

const redis = createRedisInstance();
export default redis;
