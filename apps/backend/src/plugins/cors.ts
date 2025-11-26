import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { env } from '../env';

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: env.ORIGIN_FRONTEND,
    methods: ['GET', 'POST'],
  });
});

