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
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import UserButton from "./UserButton";
import { useMe } from "@/hooks/useMe";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const SidebarNav = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const me = useMe();

  if (!user) return null;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <h1 className="text-lg font-semibold">
          {me.me?.organization?.name ?? (
            <div>
              <Button variant="ghost">Create a Organization</Button>
            </div>
          )}
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>BLA BLA</SidebarGroupLabel>
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
        <UserButton user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
