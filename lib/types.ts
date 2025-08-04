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
  setStep: (step: "initial" | "create" | "join") => void;
};
