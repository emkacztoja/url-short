import fp from 'fastify-plugin';
import { createClient } from 'redis';
import { env } from '../env';

const redis = createClient({ url: env.REDIS_URL });

export default fp(async (fastify) => {
  await redis.connect();
  fastify.decorate('redis', redis);
  fastify.addHook('onClose', async () => {
    await redis.disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    redis: ReturnType<typeof createClient>;
  }
}

