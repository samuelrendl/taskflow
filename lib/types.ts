export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
};

export type OrganizationSummary = {
  id: string;
  name: string;
};

export type Me = {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: OrganizationSummary | null;
};

export type MeResponse = {
  me: Me;
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

export type Team = {
  id: string;
  name: string;
  users: User[];
  organization: OrganizationSummary;
  issuesAssigned?: Issue[];
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

export type DialogStep = "initial" | "create" | "join" | "final";

export interface DialogStepHandler<T = Organization | Team> {
  (step: DialogStep, data?: T): void;
}

export interface BaseDialogProps<T = Organization | Team> {
  setStep: DialogStepHandler<T>;
}

export interface CreateDialogProps<T = Organization | Team> extends BaseDialogProps<T> {
  ownerId?: string;
  organizationId?: string;
}
