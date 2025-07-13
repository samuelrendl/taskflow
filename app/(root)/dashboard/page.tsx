import { SignOut } from "@/components/auth/SignOutButton";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();
  if (!session?.user) redirect("/");

  return (
    <div>
      <h1>{session?.user?.email}</h1>
      <SignOut />
    </div>
  );
};

export default Dashboard;
