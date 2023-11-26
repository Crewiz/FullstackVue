import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client' 
import bcrypt from 'bcrypt';

// Initialize tRPC
const t = initTRPC.context<Context>().create();

interface Context {
  db: PrismaClient;
}

const addUserValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    agreeTerms: z.boolean(),
})

const updateUserValidator = UserValidator.partial();

// Create main router
export const appRouter = t.router({
  addUser: t.procedure
    .input(addUserValidator)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const newUser = await db.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: input.password,
          agreeTerms: false,
        }
      });
      return newUser;
    })
});

export type AppRouter = typeof appRouter;
