"use client";

import { useOrganization } from "@/hooks/useOrganization";

const OrganizationLoader = () => {
  useOrganization();
  return null; // This component just loads data, no UI
};

export default OrganizationLoader;