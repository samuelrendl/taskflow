import { auth } from "@/auth";
import { SignOut } from "@/components/auth/SignOutButton";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{session?.user?.email}</h1>
      <SignOut />
    </div>
  );
};

export default Dashboard;
