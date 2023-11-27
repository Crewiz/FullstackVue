import { t, Context } from './router';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// validator for default action
const defaultActionInput = z.object({
  action: z.literal('default'), // You can choose any action name you like
});

// Validator for creating a user
const createUserInput = z.object({
  action: z.literal('create'),
  data: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    agreeTerms: z.boolean(),
  }),
});

// Validator for updating a user
const updateUserInput = z.object({
  action: z.literal('update'),
  id: z.number(),
  data: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    // You can add more fields here as needed
  }),
});

// Validator for deleting a user
const deleteUserInput = z.object({
  action: z.literal('delete'),
  id: z.number(),
});

// Validator for getting a user
const getUserInput = z.object({
  action: z.literal('get'),
  id: z.number(),
});

// Union of all user action inputs
const userActions = createUserInput.or(updateUserInput).or(deleteUserInput).or(getUserInput);

export const userRouter = t.router({
  user: t.procedure
    .input(userActions)
    .mutation(async ({ ctx, input }) => {
      console.log('Received user action:', input.action);
      console.log('Received input:', input);

      const { db } = ctx;

      switch (input.action) {
        case 'create':
          console.log('Create data:', input.data);
          // Hash the password before storing it
          const hashedPassword = await bcrypt.hash(input.data.password, 10);
          const createdUser = await db.user.create({
            data: {
              ...input.data,
              password: hashedPassword,
            },
          });
          console.log('User created:', createdUser);
          return createdUser;

        case 'update':
          console.log('Update data:', input.data, 'ID:', input.id);
          // Handle update user logic here
          const updatedUser = await db.user.update({
            where: { id: input.id },
            data: input.data,
          });
          return updatedUser;

        case 'delete':
          console.log('Delete ID:', input.id);
          // Handle delete user logic here
          await db.user.delete({
            where: { id: input.id },
          });
          return { success: true };

        case 'get':
          console.log('Get ID:', input.id);
          // Handle get user logic here
          const user = await db.user.findUnique({
            where: { id: input.id },
          });
          if (!user) {
            throw new Error('User not found');
          }
          return user;

        default:
          throw new Error('Invalid action');
      }
    }),
});

export type UserRouterType = typeof userRouter;
