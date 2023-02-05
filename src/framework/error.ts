import { FastifyInstance } from 'fastify';

import { logger } from './logging';

export class JsonResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public additionalFields: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'JsonResponse';
  }
  get response() {
    return {
      message: this.message,
      ...this.additionalFields,
    };
  }
}

export const errorHandler: Parameters<FastifyInstance['setErrorHandler']>[0] = (
  err,
  _req,
  reply,
) => {
  if (err instanceof JsonResponse) {
    return reply.code(err.statusCode).send(err.response);
  }

  logger.error({ err }, 'unknown error');
  return reply.code(500).send({ message: 'Internal Server Error' });
};
