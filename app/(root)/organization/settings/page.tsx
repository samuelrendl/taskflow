"use client";

import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/useMe";
import { deleteOrganization } from "@/lib/api";

const Settings = () => {
  const me = useMe();
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => deleteOrganization(me.me!.organization!.id)}
      >
        Delete Organization
      </Button>
    </div>
  );
};

export default Settings;
