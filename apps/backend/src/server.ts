import Fastify from 'fastify';
import pino from 'pino';
import corsPlugin from './plugins/cors.js';
import prismaPlugin from './plugins/prisma.js';
import redisPlugin from './plugins/redis.js';
import rateLimitPlugin from './plugins/rateLimit.js';
import shortenRoute from './routes/shorten.js';
import redirectRoute from './routes/redirect.js';
import { env } from './env.js';
import sensible from '@fastify/sensible';

const fastify = Fastify({
  logger: pino({ level: 'info' }),
});

await fastify.register(prismaPlugin);
await fastify.register(redisPlugin);
await fastify.register(sensible);
await fastify.register(corsPlugin);
await fastify.register(rateLimitPlugin);
await fastify.register(shortenRoute);
await fastify.register(redirectRoute);

const start = async () => {
  try {
    await fastify.listen({ port: Number(env.PORT), host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
