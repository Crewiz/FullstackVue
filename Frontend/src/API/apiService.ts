// apiService.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:3000/trpc';

// TypeScript interfaces for user data
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/* interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  // Include other fields that can be updated
} */

/* interface UserActionRequest {
  action: 'create' | 'get' | 'update' | 'delete';
  data?: UserRegistrationData | UserUpdateData;
  id?: number;
} */

interface UserResponse {
  result: {
    data: {
      user: {
        firstName: string;
        lastName: string;
        id?: number;
        email?: string;
        name?: string;
        // other user properties
      },
      token: string;
    }
  }
  // any other properties that might be part of the response
}


interface LoginData {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}
type ChatResponse = string;

export interface GptRecipeResponse {
  ingredients: string[];
  instructions: string[];
}

interface RecipeData {
  title: string;
  description: string;
  ingredients: string; 
  steps: string;
  authorId: number | undefined
}

/* interface RecipeUpdateData {
  title?: string;
  description?: string;
  ingredients?: string;
  steps?: string;
  // Include other fields that can be updated
} */

/* interface RecipeActionRequest {
  action: 'create' | 'update' | 'delete' | 'get' | 'getAll';
  data?: RecipeData | RecipeUpdateData;
  id?: number;
} */

interface RecipeResponse {
  recipe: {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    steps: string;
    authorId: number;
  };
  // any other properties that might be part of the response
}

type TrpcResult<T> = {
  result: {
    data: T;
  }
}



const apiService = {
  // User Actions
  async createUser(userData: UserRegistrationData): Promise<AxiosResponse<UserResponse>> {
    // console.log(`[${new Date().toISOString()}] Making API request to: ${requestUrl}`);
    console.log(`Request Payload: `, userData);
    try {
      console.log("Making API request with:", userData);
      const response = await axios.post<UserResponse>(`${BASE_URL}/user`, {
        action: 'create',
        data: userData,
      });
      console.log("Login successful", response);
      // console.log("User's first name:", response.data.user.firstName);
      return response; // Return the whole response
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Login  request failed with error:", axiosError.message);
      if (axiosError.response) {
        console.error("Status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else {
        console.error("Error details:", axiosError);
      }

      throw new Error(axiosError.response?.data.message || 'An error occurred during API request');
    }
  },
  async loginUser(userData: LoginData): Promise<UserResponse> {
    try {
      const response = await axios.post<UserResponse>(`${BASE_URL}/user`, {
        action: 'login',
        data: userData,
      });
  
      if (response.status >= 200 && response.status < 300 && response.data.result && response.data.result.data) {
        console.log("Login successful", response.data.result.data);
        console.log("User's first name:", response.data.result.data.user.firstName);
        
        // Return the response directly as it matches UserResponse interface
        return response.data;
      } else {
        throw new Error(`Login failed. User data is missing or invalid status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw new Error('Login failed. Please try again.');
    }
  },

  // Recipe bot actions
  async getAssistantResponse(message: string): Promise<ChatResponse | GptRecipeResponse> {
    try {
      const response = await axios.post<string>(`${BASE_URL}/gpt`, {
        action: 'ask',
        data: { message },
      });
      console.log("Assistant response received:", response.data);
  
      try {
        // Attempt to parse the response as JSON
        const jsonData = JSON.parse(response.data);
        // Check if it's a recipe response
        if (jsonData.ingredients && jsonData.instructions) {
          return jsonData as GptRecipeResponse;
        }
      } catch (error) {
        // If parsing fails, it's a regular chat response
        return response.data as ChatResponse;
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("API request to get assistant response failed with error:", axiosError.message);
      if (axiosError.response) {
        console.error("Status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else {
        console.error("Error details:", axiosError);
      }
      throw new Error(axiosError.response?.data.message || 'An error occurred during API request to get assistant response');
    }
    throw new Error;
  },
  // Recipe Actions
  async createRecipe(recipeData: RecipeData): Promise<AxiosResponse<RecipeResponse>> {
    try {
      console.log(`Making API request to ${BASE_URL}/recipe with data:`, recipeData);

      const response = await axios.post<RecipeResponse>(`${BASE_URL}/recipe`, {
        action: 'create',
        data: recipeData,
      });

      return response; // Return the whole response
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      console.error("Failed uploading recipe:", axiosError.message);

      if (axiosError.response) {
        console.error("Status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else if (axiosError.request) {
        console.error("Error with the request made:", axiosError.request);
      } else {
        console.error("Non-request, non-response error:", axiosError);
      }
      throw new Error(axiosError.response?.data.message || 'An error occurred during API request');
    }
  },

  //hämtar alla recept från en avnändare
  async getAllUserRecipes(userId: number): Promise<RecipeResponse[]> {
    console.log(`getAllRecipes called with userId: ${userId}`);
    try {
      const response = await axios.post<TrpcResult<RecipeResponse[]>>(`${BASE_URL}/recipe`, {
        action: 'getUserRecipes',
        });
        console.log('Response from getAllRecipes:', response.data.result.data);
      return response.data.result.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('Error fetching all recipes for user:', axiosError.message);
        throw new Error(axiosError.response?.data.message || 'An error occurred during API request to fetch all recipes for user');
    }
},

//hämtar alla recept  -- funkar ej atm
async getAllRecipes(): Promise<RecipeResponse[]> {
  try {
    const response = await axios.post<TrpcResult<RecipeResponse[]>>(`${BASE_URL}/recipe`, {
      action: 'getAll',
    });

    console.log('Response from getAllRecipes:', response.data.result.data);
    return response.data.result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('Error fetching all recipes:', axiosError.message);
    throw new Error(axiosError.response?.data.message || 'An error occurred during API request to fetch all recipes');
  }
},


  async deleteRecipe(deleteRecipeData: { action: 'delete'; id: number }): Promise<void> {
    try {
      await axios.post<void>(`${BASE_URL}/recipe`, deleteRecipeData);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error deleting recipe:", axiosError.message);
      throw new Error(axiosError.response?.data.message || 'An error occurred during API request');
    }
  }


}

export default apiService;
