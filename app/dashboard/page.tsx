import { auth } from "@/auth";
import { SignOut } from "@/components/auth/SignOutButton";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{session?.user?.email}</h1>
      <SignOut />
    </div>
  );
};

export default page;
