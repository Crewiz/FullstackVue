import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client'
import { UserRouterType } from './userRouter';
import { GptRouterType } from './gptRouter';



export const t = initTRPC.context<Context>().create();

export interface Context {
  db: PrismaClient;
}

//main router som kombinerar alla sub-routers
export const createAppRouter = (userRouter: UserRouterType, gptRouter: GptRouterType) => {
    console.log('Creating main router with userRouter'); // Log when the main router is created
  
    return t.router({
      user: userRouter, //mergar userrouter
      gpt: gptRouter,
    });
  };
  

export type AppRouter = ReturnType<typeof createAppRouter>;
