import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { ENV_VARS } from './constants/env.js';
import { getEnv } from './utils/getEnv.js';
import { router } from './routes/index.js';
import cookieParser from 'cookie-parser';
import { UPLOADS_DIR_PATH } from './constants/path.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api-docs', swaggerDocs());

  app.use('/uploads', express.static(UPLOADS_DIR_PATH));

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandlerMiddleware);

  const PORT = getEnv(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
