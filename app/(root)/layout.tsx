import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "@/components/SidebarNav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <SidebarNav />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
