import { auth } from "@clerk/nextjs/server";
import ResumeForm from "@/components/shared/ResumeForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FormActions } from "@/lib/constants";
import { getResumeByUserId } from "@/lib/actions/resume.actions";
import { IResume } from "@/lib/database/models/resume.model";
import Link from "next/link";

const MyResumePage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const resume = await getResumeByUserId(user._id);

  if (!user || resume.length == 0) {
    return (
      <div className="container mx-auto p-4 lg:p-6 bg-indigo-200 text-indigo-950 rounded-lg shadow-lg mb-8 text-center text-2xl  flex flex-col justify-center items-center gap-4">
        <h1>No resume created yet</h1>
        <p className="italic text-md text-gray-100">
          Go to{" "}
          <Link href="/resume/create" className="underline underline-offset-8">
            &quot;Create your resume&quot;
          </Link>{" "}
          to create your first resume
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 lg:p-6 bg-indigo-200 text-indigo-950 rounded-lg shadow-lg mb-8 text-center text-2xl italic flex justify-center items-center gap-4">
        <Image
          src="/assets/icons/resume.svg"
          alt="logo"
          width={24}
          height={24}
          className="brightness-50"
        />
        <h1>Update your resume</h1>
      </div>

      {resume.map((el: IResume, index: number) => (
        <ResumeForm
          user={user}
          action={FormActions.UPDATE}
          data={el}
          key={index}
        />
      ))}
    </>
  );
};

export default MyResumePage;
