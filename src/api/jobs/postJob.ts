import { RouteHandler } from 'fastify';

import { logger } from 'src/framework/logging';
import { metricsClient } from 'src/framework/metrics';
import { validateRequestBody } from 'src/framework/validation';
import * as storage from 'src/storage/jobs';
import { JobInputSchema } from 'src/types/jobs';

export const postJobHandler: RouteHandler = async (req, reply) => {
  const jobInput = validateRequestBody(req, JobInputSchema);

  const job = await storage.createJob(jobInput);

  // no PII in these jobs
  logger.debug({ job }, 'created job');

  metricsClient.increment('job.creations');

  return reply.code(201).send(job);
};
