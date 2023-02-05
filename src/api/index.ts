import { FastifyPluginAsync } from 'fastify';

import { healthCheckHandler } from './healthCheck';
import { jobRouter } from './jobs';
import { smokeTestHandler } from './smokeTest';

export const router: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/health', healthCheckHandler);
  fastify.get('/smoke', smokeTestHandler);
  await fastify.register(jobRouter, { prefix: '/jobs' });
};
