import { FastifyPluginAsync, FastifyPluginCallback, fastify } from 'fastify';

import { contextHook } from './context';
import { errorHandler } from './error';
import { errorLoggingHook, responseLoggingHook, versionHook } from './hooks';

export const createApp = async (
  ...plugins: (FastifyPluginAsync | FastifyPluginCallback)[]
) => {
  const server = fastify();
  server.setErrorHandler(errorHandler);

  server.addHook('onRequest', contextHook);
  server.addHook('onError', errorLoggingHook);
  server.addHook('onSend', versionHook);
  server.addHook('onResponse', responseLoggingHook);

  await Promise.all(plugins.map((plugin) => server.register(plugin)));
  await server.ready();
  return server;
};
