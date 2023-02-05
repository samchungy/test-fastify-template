import createApp from './app';
import { agentFromApp } from './testing/server';

describe('app', () => {
  it('exports server for skuba start', async () => {
    const app = await createApp;
    expect(app).toHaveProperty('server');
  });

  it('has a happy health check', async () => {
    const app = await createApp;
    await agentFromApp(app).get('/health').expect(200, '');
  });

  it('has a reachable smoke test', async () => {
    const app = await createApp;
    await agentFromApp(app)
      .get('/smoke')
      .expect(({ status }) => status !== 404);
  });

  it('has a reachable nested route', async () => {
    const app = await createApp;
    await agentFromApp(app)
      .get('/jobs')
      .expect(({ status }) => status !== 404);
  });
});
