import { auth } from "@clerk/nextjs/server";
import ResumeForm from "@/components/shared/ResumeForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FormActions } from "@/lib/constants";
import { getResumeByUserId } from "@/lib/actions/resume.actions";

const CreateResumePage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const resume = await getResumeByUserId(user._id);

  return (
    <>
      <div className="container mx-auto p-4 lg:p-6 bg-indigo-200 text-indigo-950 rounded-lg shadow-lg mb-8 text-center text-2xl italic flex justify-center items-center gap-4">
        <Image
          src="/assets/icons/create.svg"
          alt="logo"
          width={24}
          height={24}
          className="brightness-50"
        />
        <h1>
          {!!resume
            ? `Create a new resume (you already have ${resume.length} created)`
            : "Create a resume "}
        </h1>
      </div>

      <ResumeForm user={user} action={FormActions.CREATE} />
    </>
  );
};

export default CreateResumePage;
