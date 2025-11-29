import { shortenRequestSchema } from '../schemas/url.schema.js';
import { createShortUrl } from '../services/url.service.js';

export default async function shortenRoute(fastify: any) {
  fastify.post('/api/shorten', {
    handler: async (request: any, reply: any) => {
      // Use safeParse to return a 400 with validation details instead of throwing
      const parsed = shortenRequestSchema.safeParse(request.body);
      if (!parsed.success) {
        // Return validation issues as a 400 Bad Request
        return reply.status(400).send({ errors: parsed.error.issues });
      }

      const { originalUrl, customAlias, expireDays } = parsed.data;
      try {
        const url = await createShortUrl(fastify, originalUrl, customAlias, expireDays);
        // Return the short URL under /i/<shortId>
        reply.send({ shortUrl: `https://i.emkacz.dev/i/${url.shortId}` });
      } catch (err) {
        // If the service throws a Fastify error (conflict), let it bubble
        if (err && typeof err === 'object' && 'statusCode' in (err as any)) {
          throw err;
        }
        // Otherwise return a generic 500
        request.log.error(err);
        reply.internalServerError('Internal server error');
      }
    },
  });
}
