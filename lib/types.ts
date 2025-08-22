export type MeResponse = {
  me: {
    id: string;
    name: string;
    email: string;
    organization: {
      id: string;
      name: string;
    } | null;
  };
};

export type Organization = {
  id: string;
  name: string;
};

export type Me = {
  id: string;
  name: string;
  email: string;
  organization: Organization | null;
};

export type setTypeProps = {
  setStep: (step: "initial" | "create" | "join" | "final", data?: Organization) => void;
};

export type CreateDialogProps = {
  ownerId: string;
  setStep: setTypeProps["setStep"];
};
