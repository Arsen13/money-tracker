import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpSchema = z.
    object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const CreateTransactionSchema = z.object({
    title: z.string().min(3),
    amount: z.string(),
    category: z.string(),
    type: z.string(),
})

export const CreateCategorySchema = z.object({
    title: z.string().min(3),
})

export interface InputFieldProps {
    type: string;
    name: string;
    label: string;
    placeholder: string;
};

export type AuthButtonProps = {
    title: string;
};

export type UserT = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
} | null;