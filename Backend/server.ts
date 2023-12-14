import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createAppRouter } from './trpc/router';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

import { userRouter } from './trpc/userRouter';
import { gptRouter } from './trpc/gptRouter';
import { recipeRouter } from './trpc/recipeRouter';

const appRouter= createAppRouter(userRouter, gptRouter, recipeRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.originalUrl}`);
    console.log('Request Body:', req.body);
    next();
  });

app.use(cors({ origin: '*' }));
app.use(express.json());

//tRPC middlewaregrejer
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: ({ req }) => {
      console.log('Creating tRPC context');
      return {
        db: prisma,
        req,
      };
    },
  }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});