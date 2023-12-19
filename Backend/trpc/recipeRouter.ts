import { t } from './router'
import { z } from 'zod'
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Validator
const createRecipeInput = z.object({
    action: z.literal('create'),
    data: z.object({
        title: z.string(),
        description: z.string(),
        ingredients: z.string(),
        steps: z.string(),
        authorId: z.number()
    }),
});

// Validator for updating a Recipe
const updateRecipeInput = z.object({
    action: z.literal('update'),
    id: z.number(),
    data: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        ingredients: z.string().optional(),
        steps: z.string().optional(),
        // You can add more fields here as needed
    }),
});

// Validator for deleting a Recipe
const deleteRecipeInput = z.object({
    action: z.literal('delete'),
    id: z.number(),
});

// Validator for getting a single Recipe
const getRecipeInput = z.object({
    action: z.literal('get'),
    id: z.number(),
});

// Validator for getting all Recipes
const getAllRecipesInput = z.object({
    action: z.literal('getAll'),
});

const getUserRecipes = z.object({
    action: z.literal('getUserRecipes'),
})

const recipeActions = createRecipeInput
    .or(updateRecipeInput)
    .or(deleteRecipeInput)
    .or(getAllRecipesInput)
    .or(getRecipeInput)
    .or(getUserRecipes)
    .or(z.object({ action: z.literal('query'), authorId: z.number() })); // Lägg till detta för query


export const recipeRouter = t.procedure
    .input(recipeActions)
    .mutation(async ({ ctx, input }) => {
        console.log('Received recipe action:', input.action);
        console.log('Received input:', input);

        const { db, user } = ctx;

        switch (input.action) {
            case 'create':
                try {
                    const newRecipe = await db.recipe.create({
                        data: input.data,
                    });
                    return newRecipe;
                } catch (error) {
                    console.error("Error creating recipe:", error);
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        console.error("Prisma error details:", error.meta);
                  } else if (error instanceof Error) {
                    console.error("general error details:", error.message);
                  }
                  throw new Error('Error creating new recipe.')
                
                }

            case 'update':
                try {
                    const updatedRecipe = db.recipe.update({
                        where: { id: input.id },
                        data: input.data,
                    })
                    return updatedRecipe;
                } catch (error) {
                    console.error("Error updating recipe:", error);
                    throw new Error('Error updating recipe.')
                }

            case 'get':
                try {
                    const recipe = await db.recipe.findUnique({
                        where: { id: input.id },
                    });
                    if (!recipe) {
                        throw new Error('Recipe not found');
                    }
                    return recipe;
                } catch (error) {
                    console.error("Error retrieving recipe:, error");
                    throw new Error('Unable to retrieve recipe.');
                }
            case 'getAll':
                try {
                    console.log("Fetching all recipes");
                    const recipes = await db.recipe.findMany();
                    return recipes;
                } catch (error) {
                    console.error("Error retrieving recipes:", error);
                    throw new Error('Unable to retrieve recipes.');
                }
            case 'delete':
                try {
                    console.log('Delete ID:', input.id);
                    await db.recipe.delete({
                        where: { id: input.id },
                    });
                    return { success: true, message: "Recipe deleted successfully" };
                } catch (error) {
                    console.error("Error deleting recipe:", error);
                    throw new Error('Error deleting recipe.');
                }
            
            case 'getUserRecipes':
                try {
                    const recipes = await db.recipe.findMany({
                        where: { authorId: user.userId }
                    });
                    return recipes;
                } catch (error) {
                    console.error("Error retrieving recipes:", error);
                    throw new Error('Unable to retrieve recipes.');
                }

            default:
                throw new Error('Invalid action');
        }


    });

export type RecipeRouterType = typeof recipeRouter;