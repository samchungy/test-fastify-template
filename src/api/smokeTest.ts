import { RouteHandler } from 'fastify';

import { smokeTestJobStorage } from 'src/storage/jobs';

/**
 * Tests connectivity to ensure appropriate access and network configuration.
 */
export const smokeTestHandler: RouteHandler = async (_req) => {
  await Promise.all([smokeTestJobStorage()]);

  return 'Smoke test passed';
};
