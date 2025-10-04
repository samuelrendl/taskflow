import TeamName from "@/components/TeamName";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  return (
    <div>
      <TeamName />
    </div>
  );
};

export default Dashboard;
