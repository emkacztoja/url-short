import type { FastifyInstance } from 'fastify';
import { shortenRequestSchema } from '../schemas/url.schema.js';
import { createShortUrl } from '../services/url.service.js';

export default async function shortenRoute(fastify: FastifyInstance) {
  fastify.post('/api/shorten', {
    handler: async (request, reply) => {
      const { originalUrl, customAlias } = shortenRequestSchema.parse(request.body);
      const url = await createShortUrl(fastify, originalUrl, customAlias);
      reply.send({ shortUrl: `https://i.emkacz.dev/${url.shortId}` });
    },
  });
}
