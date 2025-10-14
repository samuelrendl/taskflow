"use client";

import { useOrganization } from "@/hooks/useOrganization";

const OrganizationLoader = () => {
  useOrganization();
  return null;
};

export default OrganizationLoader;