import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        (await cookies()).delete('token');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Next server error" }, { status: 500 });
    }
}