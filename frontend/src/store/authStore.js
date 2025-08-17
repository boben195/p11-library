import { create } from "zustand";
import axios from "axios";

const API_URI = "http://localhost:5000/api"


export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,


    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });
        try {
            const responce = await axios.post(`${API_URI}/signup`, {
                username,
                email,
                password,
            })

            set({
                user: responce.data.user,
                isLoading: false,
            })
        } catch (error) {
            set({ isLoading: false, error: error.responce.data.message || "Error during signup!!!", });
            throw error;
        }
    }

}))