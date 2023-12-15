import { t, Context } from './router';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { jwtVerificationMiddleware } from './jwtMiddleware';

const prisma = new PrismaClient();

// Validator for creating a user
const createUserInput = z.object({
  action: z.literal('create'),
  data: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

//Validator for user login
const loginUserInput = z.object({
  action: z.literal('login'),
  data: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
})

// Validator for updating a user
const updateUserInput = z.object({
  action: z.literal('update'),
  data: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

// Validator for deleting a user
const deleteUserInput = z.object({
  action: z.literal('delete'),
});

// Validator for getting a user
const getUserInput = z.object({
  action: z.literal('get'),
});

// Union of all user action inputs
const userActions = createUserInput
  .or(updateUserInput)
  .or(deleteUserInput)
  .or(getUserInput)
  .or(loginUserInput);

export const userRouter = t.procedure
  .input(userActions)
  .mutation(async ({ ctx, input }) => {
    console.log('Received user action:', input.action);
    console.log('Received input:', input);

    const { db } = ctx;

    switch (input.action) {
      case 'create':
        console.log('Processing create action with data:', input.data);
        try {
          console.log('Create action received with data:', input.data);
          // Hash the password before storing it
          const hashedPassword = await bcrypt.hash(input.data.password, 10);
          const createdUser = await db.user.create({
            data: {
              ...input.data,
              password: hashedPassword,
            },
          });
          const tokenForNewUser = jwt.sign(
            { userId: createdUser.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '3h' }
          );
          console.log('Generated JWT for new user', tokenForNewUser);
          console.log('User created:', createdUser);
          return { user: createdUser, token: tokenForNewUser };
        } catch (error: unknown) {
          if (error instanceof Error)
          console.error("Error in creating user:", error);
          else {
            console.error('Invalid token and error was not an instance of Error:', error)
          }
          throw error; // Re-throw the error for further handling if necessary
        }

      case 'login':
        const userToLogin = await db.user.findUnique({
          where: { email: input.data.email }
        });
        if (!userToLogin || !await bcrypt.compare(input.data.password, userToLogin.password)) {
          throw new Error('Invalid email or password');
        }
        const tokenForLogin = jwt.sign(
          { userId: userToLogin.id },
          process.env.JWT_SECRET as string,
          { expiresIn: '7d' }
        );
        console.log('Generated JWT for logged-in user:', tokenForLogin)
        return { user: userToLogin, token: tokenForLogin };

      case 'update':
        console.log('Attempting to update user...')
        if (!ctx.user) {
          console.log('Authentication required, no user in context'); 
          throw new Error('Authentication required');
        }
        console.log('Authenticated user:', ctx.user);
        console.log('Update data:', input.data, 'ID:', ctx.user.userId);
        // Handle update user logic here
        const updatedUser = await db.user.update({
          where: { id: ctx.user.userId },
          data: input.data,
        });
        console.log('User updated:', updatedUser); 
        return updatedUser;

      case 'delete':
        if (!ctx.user) {
          throw new Error('Authentication required');
        }
        console.log('Delete ID:', ctx.user.userId);
        // Handle delete user logic here
        await db.user.delete({
          where: { id: ctx.user.userId },
        });
        return { success: true };

      case 'get':

        console.log('Get ID:', ctx.user.userId);
        // Handle get user logic here
        const user = await db.user.findUnique({
          where: { id: ctx.user.userId },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;

      default:
        throw new Error('Invalid action');
    }
  });
  
  

export type UserRouterType = typeof userRouter;
