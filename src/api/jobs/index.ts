import { FastifyPluginAsync } from 'fastify';

import { getJobsHandler } from './getJobs';
import { postJobHandler } from './postJob';

// eslint-disable-next-line @typescript-eslint/require-await
export const jobRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/', getJobsHandler);
  fastify.post('/', postJobHandler);
};
