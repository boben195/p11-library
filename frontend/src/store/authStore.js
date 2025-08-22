import { create } from "zustand";
import axios from "axios";

const API_URI = "http://localhost:5000/api"

axios.defaults.withCredentials = true; //save token to cookies !DONT FORGET IT IN server.js


export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,


    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });
        try {
            const response = await axios.post(`${API_URI}/signup`, {
                username,
                email,
                password,
            })

            set({
                user: response.data.user,
                isLoading: false,
            })
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error during signup!!!", });
            throw error;
        };
    },


    login: async (email, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            const response = await axios.post(`${API_URI}/login`, {
                email,
                password,
            });


            const { user, message } = response.data;
            set({ user, isLoading: false, message });

            return {user, message}
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error during login!!!", });
            throw error;
        }
    },


    fetchUser: async () => {
        set({ fetchingUser: true, error: null });

        try {
            const response = await axios.get(`${API_URI}/fetch-user`);

            set({user: response.data.user, fetchingUser: false})
        } catch (error) {
            set({ fetchingUser: false, error: null, user: null, });
            throw error;
        }
    }

}))