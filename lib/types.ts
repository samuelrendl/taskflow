export type MeResponse = {
  me: {
    id: string;
    name: string;
    email: string;
    role: string;
    organization: {
      id: string;
      name: string;
    } | null;
  };
};

export type Organization = {
  id: string;
  name: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  users: User[];
  teams: {
    id: string;
    name: string;
  }[];
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
};

export type Me = {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: {
    id: string;
    name: string;
  } | null;
};

export type setTypeProps = {
  setStep: (step: "initial" | "create" | "join" | "final", data?: Organization) => void;
};

export type CreateDialogProps = {
  ownerId: string;
  setStep: setTypeProps["setStep"];
};
