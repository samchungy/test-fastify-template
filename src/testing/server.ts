import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback,
} from 'fastify';
import request from 'supertest';

import { createApp } from 'src/framework/server';

/**
 * Create a new SuperTest agent from a Fastify application.
 */
export const agentFromApp = (app: FastifyInstance) => request.agent(app.server);

/**
 * Create a new SuperTest agent from a set of Fastify plugins.
 */
export const agentFromPlugins = async (
  ...plugins: (FastifyPluginAsync | FastifyPluginCallback)[]
) => {
  const app = await createApp(...plugins);

  return agentFromApp(app);
};
