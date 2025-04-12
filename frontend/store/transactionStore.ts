import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";
import { Category } from "./categoryStore";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create<State & Actions>()((set, get) => ({
    transactions: [],
    page: 1,
    limit: 5,
    maxPageNumber: 0,

    getTransactions: async (page = get().page) => {
        const { limit } = get();

        const response = await axiosInstance.get(`transactions/pagination?page=${page}&limit=${limit}&sortBy=id&sortOrder=asc`);

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
    },

    deleteTransaction: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`transactions/${id}`);

            if (response.status == 200) {
                get().getTransactions();
                toast.success("Transaction was successfully deleted")
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            } else {
                console.log(`Error with delete transaction id: ${id}`)
            }
        }
    }
}))