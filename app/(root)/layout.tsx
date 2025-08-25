"use client";

import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardLoader from "@/components/DashboardLoader";
import SidebarNav from "@/components/SidebarNav";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <DashboardLoader />
      <SidebarProvider>
        <SidebarNav />
        <main className="h-dvh w-full overflow-hidden flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </Provider>
  );
};

export default Layout;
