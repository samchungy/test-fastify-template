import { RouteHandler } from 'fastify';

import { logger } from 'src/framework/logging';
import { metricsClient } from 'src/framework/metrics';
import * as storage from 'src/storage/jobs';

export const getJobsHandler: RouteHandler = async (_req) => {
  const jobs = await storage.readJobs();

  // no PII in these jobs
  logger.debug({ jobs }, 'read jobs');

  metricsClient.increment('job.reads', jobs.length);

  return jobs;
};
