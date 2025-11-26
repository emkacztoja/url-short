import type { FastifyInstance } from 'fastify';

export default async function adminUrlsRoute(fastify: any) {
  // List URLs with pagination and optional search
  fastify.get('/urls', {
    preHandler: fastify.verifyAdmin,
    handler: async (request: any, reply: any) => {
      const query = request.query as any;
      const page = Math.max(1, parseInt(query.page) || 1);
      const perPage = Math.min(100, Math.max(1, parseInt(query.perPage) || 20));
      const q = query.q ? String(query.q) : undefined;

      const where: any = {};
      if (q) {
        where.OR = [
          { shortId: { contains: q } },
          { originalUrl: { contains: q } },
        ];
      }

      const [items, total] = await Promise.all([
        fastify.prisma.url.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * perPage,
          take: perPage,
        }),
        fastify.prisma.url.count({ where }),
      ]);

      reply.send({ items, total, page, perPage });
    },
  });

  // Toggle isActive (PATCH)
  fastify.patch('/urls/:shortId', {
    preHandler: fastify.verifyAdmin,
    handler: async (request: any, reply: any) => {
      const { shortId } = request.params as { shortId: string };
      const body = request.body as any;
      const data: any = {};
      if (typeof body.isActive === 'boolean') data.isActive = body.isActive;
      if (Object.keys(data).length === 0) return reply.status(400).send({ error: 'Nothing to update' });
      try {
        const updated = await fastify.prisma.url.update({ where: { shortId }, data });
        reply.send({ url: updated });
      } catch (err) {
        reply.status(404).send({ error: 'URL not found' });
      }
    },
  });

  // Delete URL (hard delete)
  fastify.delete('/urls/:shortId', {
    preHandler: fastify.verifyAdmin,
    handler: async (request: any, reply: any) => {
      const { shortId } = request.params as { shortId: string };
      try {
        await fastify.prisma.url.delete({ where: { shortId } });
        reply.send({ success: true });
      } catch (err) {
        reply.status(404).send({ error: 'URL not found' });
      }
    },
  });
}
