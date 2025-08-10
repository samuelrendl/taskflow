import { useMe } from "@/hooks/useMe";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OrgDialog from "./dialog/Create New Org/OrgDialog";
import { Button } from "./ui/button";
import Link from "next/link";

const OrgButton = () => {
  const me = useMe();

  if (me.loading) {
    return null;
  }

  if (!me.me?.organization) {
    return <OrgDialog userHasOrg={false} />;
  }

  const items = [
    { title: "Members", url: "/organization/members" },
    {
      title: "Settings",
      url: "/organization/settings",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="font-bold">{me.me?.organization?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My organization</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <Link href={item.url}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrgButton;
