import { NextResponse } from "next/server";
import { createResume, getAllResume } from "@/lib/actions/resume.actions";
import { NextApiRequest, NextApiResponse } from "next";

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

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resume = await createResume(req.body);
    res.status(200).json(resume);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (error as any)?.response?.status || 500;
    const message = (error as Error)?.message || "Internal Server Error";

    return NextResponse.json(
      {
        error: `api/resumes post -- ${message}`,
        status,
      },
      { status }
    );
  }
};
