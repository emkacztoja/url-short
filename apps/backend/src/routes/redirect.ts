import type { FastifyInstance } from 'fastify';
import { resolveShortUrl } from '../services/url.service.js';

export default async function redirectRoute(fastify: FastifyInstance) {
  fastify.get('/:shortId', async (request, reply) => {
    const { shortId } = request.params as { shortId: string };
    const destination = await resolveShortUrl(fastify, shortId);
    if (!destination) {
      throw fastify.httpErrors.notFound('URL not found');
    }
    reply.redirect(302, destination);
  });
}
