import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { userRouter } from './trpc/userRouter';
import { createAppRouter } from './trpc/router';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const appRouter= createAppRouter(userRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(cors()); // Allows requests from any origin in development
} else {
    // For production, set a specific origin
    app.use(cors({ origin: 'your production frontend URL' }));
}
app.use(express.json());

//tRPC middlewaregrejer
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => {
      console.log('Creating tRPC context');
      return {
        db: prisma,
      };
    },
  }));
  
  

app.get('/', (req, res) => {
    res.send('Vue Fighters');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});