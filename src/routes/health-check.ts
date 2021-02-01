import { Router } from 'express';

const healthCheckRoute = () => {
  const healthCheckRouter = Router();

  healthCheckRouter.get('/', (req, resp) => {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    }
    try {
      resp.send(healthCheck);
    } catch (err) {
      healthCheck.message = err;
      resp.status(503).send(healthCheck);
    }
  });

  return healthCheckRouter;
}

export default healthCheckRoute;
