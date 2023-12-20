import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createAppRouter } from './trpc/router';
import { decodeAndVerifyJwtToken } from './utility/jwtUtils';
import path from 'path'

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});



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
    createContext: async ({ req }) => {
      console.log('Processing request for createContext...');
      console.log("pre-extracted-token:", req.headers.authorization);
      
      const token = req.headers.authorization?.split(' ')[1]
      console.log('Extracted Token:', token);

      let user = null;
        if (token) {
            user = await decodeAndVerifyJwtToken(token);
            console.log('Decoded User:', user);
        } else {
            console.log('No token found in the request headers');
        }
      return {
        db: prisma,
        req,
        user,
      };
    },
  }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});