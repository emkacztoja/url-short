import fp from 'fastify-plugin';
import { env } from '../env.js';

export default fp(async (fastify: any) => {
  // simple preHandler to validate admin API key from header
  fastify.decorate('verifyAdmin', async (request: any, reply: any) => {
    const headerKey = (request.headers['x-admin-api-key'] as string) ||
      (request.headers['authorization']?.startsWith('Bearer ') ? request.headers['authorization']?.slice(7) : undefined);

    if (!env.ADMIN_API_KEY) {
      fastify.log.warn('ADMIN_API_KEY not set - admin routes are disabled');
      reply.status(503).send({ error: 'Admin not configured' });
      return;
    }

    if (!headerKey || headerKey !== env.ADMIN_API_KEY) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    // authorized
    return;
  });
});
