import { resolveShortUrl } from '../services/url.service.js';

export default async function redirectRoute(fastify: any) {
  // New preferred route under /i/:shortId
  fastify.get('/i/:shortId', async (request: any, reply: any) => {
    const { shortId } = request.params as { shortId: string };
    const destination = await resolveShortUrl(fastify, shortId);
    if (!destination) {
      throw fastify.httpErrors.notFound('URL not found');
    }
    reply.redirect(302, destination);
  });

  // Keep existing root-level route for backward compatibility
  fastify.get('/:shortId', async (request: any, reply: any) => {
    const { shortId } = request.params as { shortId: string };
    const destination = await resolveShortUrl(fastify, shortId);
    if (!destination) {
      throw fastify.httpErrors.notFound('URL not found');
    }
    reply.redirect(302, destination);
  });
}
