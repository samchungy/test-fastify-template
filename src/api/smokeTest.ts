import { RouteHandler } from 'fastify';

import { smokeTestJobStorage } from 'src/storage/jobs';

/**
 * Tests connectivity to ensure appropriate access and network configuration.
 */
export const smokeTestHandler: RouteHandler = async (_req, reply) => {
  await Promise.all([smokeTestJobStorage()]);

  return reply.code(200).send('Smoke test passed');
};
