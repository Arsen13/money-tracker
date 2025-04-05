import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";
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
    deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<State & Actions>()((set, get) => ({
    categories: [],

    getCategories: async () => {
        const response = await axiosInstance.get('categories');

        if (response.status == 200) {
            set(() => ({ categories: response.data }))
        }
    },

    deleteCategory: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`categories/${id}`);

            if (response.status == 200) {
                const updatedCategories = get().categories.filter(item => item.id !== id);
                set(() => ({ categories: updatedCategories }));
                
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(`Error with delete category id:${id}`);
        }
    }
}))