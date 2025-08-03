import type { Metadata } from "next";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const session = await getSession();
  if (!session?.user) redirect("/");

  return (
    <div>
      <h1>Welcome</h1>
      
    </div>
  );
};

export default Dashboard;
