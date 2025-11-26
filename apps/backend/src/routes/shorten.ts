import type { FastifyInstance } from 'fastify';
import { shortenRequestSchema } from '../schemas/url.schema';
import { createShortUrl } from '../services/url.service';

export default async function shortenRoute(fastify: FastifyInstance) {
  fastify.post('/api/shorten', {
    schema: { body: shortenRequestSchema },
    handler: async (request, reply) => {
      const { originalUrl, customAlias } = shortenRequestSchema.parse(request.body);
      const url = await createShortUrl(fastify, originalUrl, customAlias);
      reply.send({ shortUrl: `https://i.emkacz.dev/${url.shortId}` });
    },
  });
}

