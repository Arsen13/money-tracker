import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";
import { Category } from "./categoryStore";

export type Transaction = {
    id: string;
    userId: string;
    categoryId: string;
    category: Category;
    title: string;
    type: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

export type State = {
    transactions: Transaction[];
    page: number;
    limit: number;
}

export type Actions = {
    getTransactions: () => void;
}

export const useTransactionStore = create<State & Actions>()((set, get) => ({
    transactions: [],
    page: 1,
    limit: 5,

    getTransactions: async (page = get().page) => {
        const { limit } = get();

        const response = await axiosInstance.get(`transactions/pagination?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=asc`);

        if (response.status == 200) {
            set(() => ({ transactions: response.data }));
        }
    }
}))