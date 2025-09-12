"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Inbox, } from "lucide-react";
import UserButton from "./UserButton";
import OrgButton from "./OrgButton";
import NewTask from "./NewTask";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Tasks",
    url: "#",
    icon: Inbox,
  },
];

const SidebarNav = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <OrgButton />
        <NewTask />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Teams</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
