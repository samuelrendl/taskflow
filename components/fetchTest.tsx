"use client";

import { fetchMe } from "@/lib/api";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  organization?: {
    id: string;
    name: string;
  } | null;
};

const FetchTest = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchMe().then(setUser).catch(console.error);
  }, []);

  if (!user) {
    return <div className="mx-auto">Loading user data...</div>;
  }
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.organization?.name ?? "No organization"}</p>
    </div>
  );
};

export default FetchTest;
