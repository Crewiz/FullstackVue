import { defineStore } from 'pinia';
import apiService from '../API/apiService';
import axios from 'axios';

interface User {
    email: string;
    name: string;
    firstname?: string;
    lastname?: string;
}

const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthenticated: false as boolean,
        user: null as User | null,
    }),
    actions: {
        loginUser(user: User, token: string) {
            this.isAuthenticated = true;
            this.user = user;
            try {
                localStorage.setItem('jwt', token);
            } catch (error) {
                console.error('Failed to set item in localStorage', error)
            }
        },
        logoutUser() {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('jwt');
        },
    },
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
})

export default useAuthStore;