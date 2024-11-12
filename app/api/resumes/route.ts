import { NextResponse } from "next/server";
import {  getAllResume } from "@/lib/actions/resume.actions";


export const GET = async () => {
  try {
    const users = await getAllResume();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (error as any)?.response?.status || 500;
    const message = (error as Error)?.message || "Internal Server Error";

    return NextResponse.json(
      {
        error: `api/resumes -- ${message}`,
        status,
      },
      { status }
    );
  }
};
