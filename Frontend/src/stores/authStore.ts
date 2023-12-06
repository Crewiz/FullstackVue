import { defineStore } from 'pinia';

interface User {
    email: string;
    name: string;
    firstname?: string;
    lastname?: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthenticated: false as boolean,
        user: null as User | null,
    }),
    actions: {
        loginUser(user: User) {
            this.isAuthenticated = true;
            this.user = user;
        },
        logoutUser() {
            this.isAuthenticated = false;
            this.user = null;
        },
    },
})