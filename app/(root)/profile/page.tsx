import Profile from "@/components/shared/Profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <Profile userId={userId} />;
};

export default ProfilePage;
