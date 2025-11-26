import Fastify from 'fastify';
import pino from 'pino';
import corsPlugin from './plugins/cors';
import prismaPlugin from './plugins/prisma';
import redisPlugin from './plugins/redis';
import rateLimitPlugin from './plugins/rateLimit';
import shortenRoute from './routes/shorten';
import redirectRoute from './routes/redirect';
import { env } from './env';
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
