import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/actions/user.actions";

export const GET = async () => {
  try {
    const users = await getAllUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (error as any)?.response?.status || 500;
    const message = (error as Error)?.message || "Internal Server Error";

    return NextResponse.json(
      {
        error: `api/users -- ${message}`,
        status,
      },
      { status }
    );
  }
};
