import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand"

export type Category = {
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export type State = {
    categories: Category[]
}

export type Actions = {
    getCategories: () => void;
}

export const useCategoryStore = create<State & Actions>()((set) => ({
    categories: [],
    getCategories: async () => {
        const response = await axiosInstance.get('categories');

        if (response.status == 200) {
            set(() => ({categories: response.data}))
        }
    },
}))