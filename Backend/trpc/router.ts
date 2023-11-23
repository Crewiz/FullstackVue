import { initTRPC } from '@trpc/server';
import pool from '../db';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.context<Context>().create();

interface Context {
    db: typeof pool;
}

function createContext(): Context {
    return {
        db: pool,
    };
}

const addUserValidator = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

// Create main router
export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello tRPC!';
  }),
addMessage: t.procedure
  .input(z.object ({
    message: z.string(),
  }))
  .mutation(({ input }) => {
    return `Recieved message: ${input.message}`;
  }),
  addUser: t.procedure
    .input(addUserValidator)
    .mutation(async ({ ctx, input }) => {
        const { db } = ctx;
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
         [input.name, input.email, input.password]   
        );
        return result.rows[0];
    })
});

export type AppRouter = typeof appRouter;
