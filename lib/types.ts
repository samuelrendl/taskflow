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

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo?: User;
  createdBy: User;
  team?: Team;
  createdAt: string;
  updatedAt: string;
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

export type Team = {
  id: string;
  name: string;
  users: User[];
  organization: {
    id: string;
    name: string;
  };
  issuesAssigned?: Issue[];
};

export type setTypeProps = {
  setStep: (
    step: "initial" | "create" | "join" | "final",
    data?: Organization,
  ) => void;
};

export type CreateDialogProps = {
  ownerId: string;
  setStep: setTypeProps["setStep"];
};
