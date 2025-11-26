import fp from 'fastify-plugin';
import Redis from 'ioredis';
import { env } from '../env.js';

const redis = new Redis(env.REDIS_URL);

export default fp(async (fastify) => {
  // ioredis connects automatically; ensure ready before decorating
  await new Promise((resolve, reject) => {
    redis.once('ready', resolve);
    redis.once('error', reject);
  });
  fastify.decorate('redis', redis);
  fastify.addHook('onClose', async () => {
    await redis.quit();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}
