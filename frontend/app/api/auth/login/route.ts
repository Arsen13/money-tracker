import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await axiosInstance.post('auth/login', body);

        const { token } = response.data;

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        })

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: "Next server error" }, { status: 500 });
    }
}