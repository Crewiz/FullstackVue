import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const app = express();

//tRPC middlewaregrejer
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
        db: prisma,
    }), // Updated to return an empty object
  }));
  

app.get('/', (req, res) => {
    res.send('Vue Fighters');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});