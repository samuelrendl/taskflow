"use client";

import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardLoader from "@/components/DashboardLoader";
import SidebarNav from "@/components/SidebarNav";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster } from "sonner";
import OrganizationLoader from "@/components/OrganizationLoader";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session?.user) return redirect("/");

  return (
    <Provider store={store}>
      <DashboardLoader />
      <OrganizationLoader />
      <SidebarProvider>
        <SidebarNav />
        <main className="flex h-dvh w-full flex-col overflow-hidden">
          <SidebarTrigger />
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
        <Toaster position="bottom-right"/>
      </SidebarProvider>
    </Provider>
  );
};

export default Layout;
