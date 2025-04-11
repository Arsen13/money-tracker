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
    maxPageNumber: number;
}

export type Actions = {
    getTransactions: () => void;
    incrementPage: () => void;
    decrementPage: () => void;
}

export const useTransactionStore = create<State & Actions>()((set, get) => ({
    transactions: [],
    page: 1,
    limit: 5,
    maxPageNumber: 0,

    getTransactions: async (page = get().page) => {
        const { limit } = get();

        const response = await axiosInstance.get(`transactions/pagination?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=asc`);

        if (response.status == 200) {
            set(() => ({ transactions: response.data }));
        }

        const responseFindAll = await axiosInstance.get('transactions');

        if (response.status == 200) {
            const length = Math.ceil(responseFindAll.data.length / get().limit);
            set(() => ({ maxPageNumber: length }));
        }
    },

    incrementPage: () => {
        const currentPage = get().page;
        if (currentPage < get().maxPageNumber) {
            const increment = currentPage + 1;
            set(({ page: increment }));
            get().getTransactions();
        }
    },

    decrementPage: () => {
        const currentPage = get().page;
        if (currentPage > 1) {
            const decrement = currentPage - 1;
            set(({ page: decrement }));
            get().getTransactions();
        }
    }
}))