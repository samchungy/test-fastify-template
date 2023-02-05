import createLogger from '@seek/logger';

import { config } from 'src/config';

import { contextStorage } from './context';

export const logger = createLogger({
  base: {
    environment: config.environment,
    version: config.version,
  },

  mixin: () => ({ ...contextStorage.getStore()?.loggerFields }),

  level: config.logLevel,

  name: config.name,

  transport:
    config.environment === 'local' ? { target: 'pino-pretty' } : undefined,
});
