import './register';

import { router } from './api';
import { createApp } from './framework/server';

const app = createApp(router);

export default app;
