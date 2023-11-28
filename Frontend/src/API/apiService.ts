// apiService.ts
import axios, { AxiosError } from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:3000/trpc';

// TypeScript interfaces for user data
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  // Include other fields that can be updated
}

interface UserActionRequest {
  action: 'create' | 'get' | 'update' | 'delete';
  data?: UserRegistrationData | UserUpdateData;
  id?: number;
}

interface UserResponse {
  // Define based on your backend response for user actions
}

interface ErrorResponse {
  message: string;
}

const apiService = {
  // Function to create a new user
  async createUser(userData: UserRegistrationData): Promise<UserResponse> {
    try {
      const response = await axios.post<UserResponse>(`${BASE_URL}/user.user`, {
        action: 'create',
        data: userData,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.message || 'An error occurred');
    }
  },

  // Function to get a user by ID
  async getUser(id: number): Promise<UserResponse> {
    // Implementation
  },

  // Function to update a user
  async updateUser(id: number, userData: UserUpdateData): Promise<UserResponse> {
    // Implementation
  },

  // Function to delete a user
  async deleteUser(id: number): Promise<void> {
    // Implementation
  },

  // Add other API functions as needed
};

export default apiService;
