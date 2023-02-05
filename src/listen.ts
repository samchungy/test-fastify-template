import './register';

import app from './app';
import { config } from './config';
import { logger } from './framework/logging';

app
  .then((server) => {
    server.listen({ port: config.port }, (err) => {
      if (err) {
        throw err;
      }
      logger.debug(`listening on port ${server.addresses()[0].port}`);
    });
  })
  .catch((err) => {
    logger.error(err, 'Server failed to start');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
