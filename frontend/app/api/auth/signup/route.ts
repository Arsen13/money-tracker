import { axiosInstance } from '@/lib/axiosInstance';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await axiosInstance.post('user', body);

    const { id, email, firstName, lastName, token } = response.data;

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    return NextResponse.json({
      success: true,
      user: { id, email, firstName, lastName },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Next server error: ${error}` },
      { status: 500 }
    );
  }
}
