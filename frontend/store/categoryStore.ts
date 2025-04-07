import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
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
    addCategory: (data: { title: string }) => void;
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

    addCategory: async (data) => {
        try {
            const response = await axiosInstance.post('/categories', data);

            if (response.status == 201) {
                set(() => ({ categories: [...get().categories, response.data]}));
                toast.success(`Category '${response.data.title}' was added`);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                console.log('Error with creating new category', error)
            }
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