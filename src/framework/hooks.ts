import {
  onErrorAsyncHookHandler,
  onResponseAsyncHookHandler,
  onSendAsyncHookHandler,
} from 'fastify';

import { config } from 'src/config';

import { logger } from './logging';

export const versionHook: onSendAsyncHookHandler<unknown> = async (
  _req,
  reply,
  _payload,
) => {
  // FastifyReply has a .then() property which eslint thinks is something we need to await.
  // https://www.fastify.io/docs/latest/Reference/Reply/#thenfulfilled-rejected
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  reply.headers({
    server: config.version ? `${config.name}/${config.version}` : config.name,
    'x-api-version': config.version,
  });
};

export const responseLoggingHook: onResponseAsyncHookHandler = async (
  req,
  reply,
) => {
  logger.info(
    {
      status: reply.statusCode,
      latency: reply.getResponseTime(),
      headers: reply.getHeaders(), // TODO Redact auth headers
    },
    'request completed',
  );
};

export const errorLoggingHook: onErrorAsyncHookHandler = async (
  req,
  reply,
  err,
) => {
  logger.error({ err });
};
