import { auth } from "@clerk/nextjs/server";
import ResumeForm from "@/components/shared/ResumeForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const CreateResumePage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  return <ResumeForm user={user} />;
};

export default CreateResumePage;
