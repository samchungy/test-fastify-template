import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

import { FastifyRequest, onRequestHookHandler } from 'fastify';

interface Context {
  loggerFields: Record<string, unknown>;
  req: FastifyRequest;
}

export const contextStorage = new AsyncLocalStorage<Context>();

/**
 * This hook sets up the context storage per request
 */
export const contextHook: onRequestHookHandler = (req, _reply, done) => {
  contextStorage.run({ loggerFields: { requestId: randomUUID() }, req }, done);
};
