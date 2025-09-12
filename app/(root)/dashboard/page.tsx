import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

export default Dashboard;
