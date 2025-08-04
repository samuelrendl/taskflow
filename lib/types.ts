export type MeResponse = {
  me: {
    id: string;
    name: string;
    email: string;
    organization: {
      name: string;
    } | null;
  };
};

export type Organization = {
  name: string;
};

export type Me = {
  id: string;
  name: string;
  email: string;
  organization: Organization | null;
};

export type setTypeProps = {
  setStep: (step: "initial" | "create" | "join" | "final") => void;
};

export type CreateDialogProps = {
  ownerId: string;
  setStep: setTypeProps["setStep"];
};

export type FinalDialogProps = {
  organizationName: string;
};

export type CreateOrgResponse = {
  createOrganization: {
    id: string;
    name: string;
  };
};
