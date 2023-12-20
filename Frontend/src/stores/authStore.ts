import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
    id?: number;
    email?: string;
    name?: string;
    firstname?: string;
    lastname?: string;
}

const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthenticated: false,
        user: null as User | null,
    }),
    actions: {
        initializeAuthState() {
            const token = localStorage.getItem('jwt');
            const userInfo = localStorage.getItem('user');

            if (token) {
                this.isAuthenticated = true;
                this.user = userInfo ? JSON.parse(userInfo) : null;
            }
        },
        loginUser(user: User, token: string) {
            this.isAuthenticated = true;
            this.user = user;
            try {
                localStorage.setItem('jwt', token);
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error('Failed to set item in localStorage', error)
            }
        },
        logoutUser() {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
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
