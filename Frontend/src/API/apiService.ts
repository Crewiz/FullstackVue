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

interface LoginData {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const apiService = {
  // Function to create a new user
  async createUser(userData: UserRegistrationData): Promise<AxiosResponse<UserResponse>> {
    try {
      console.log("Making API request with:", userData);
      const response = await axios.post<UserResponse>(`${BASE_URL}/user`, {
        action: 'create',
        data: userData,
      });
      console.log("API response received:", response);
      return response; // Return the whole response
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      
      console.error("API request failed with error:", axiosError.message);
      if (axiosError.response) {
        console.error("Status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else {
        console.error("Error details:", axiosError);
      }

      throw new Error(axiosError.response?.data.message || 'An error occurred during API request');
    }
  },
  async loginUser(userData: LoginData): Promise<AxiosResponse<UserResponse>> {
    try {
      const response = await axios.post<UserResponse>(`${BASE_URL}/user`, {
        action: 'login',
        data: userData,
      });
      console.log("Login successful", response);
      return response;
    } catch (error) {

      throw new Error('Login failed. Please try again.');
    }
  },



async getAssistantResponse(message: string): Promise<AxiosResponse<string>> {
  try {
    const response = await axios.post<string>(`${BASE_URL}/gpt`, {
      action: 'ask',
      data: { message },
    });
    console.log("Assistant response received:", response);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    console.error("API request to get assistant response failed with error:", axiosError.message);
    if (axiosError.response) {
      console.error("Status code:", axiosError.response.status);
      console.error("Response data:", axiosError.response.data);
    } else {
      console.error("Error details:", axiosError);
    }

    throw new Error(axiosError.response?.data.message || 'An error occured during API request to get assistant response');
  }
},

};

export default apiService;
