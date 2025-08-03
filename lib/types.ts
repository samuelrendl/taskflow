export type MeResponse = {
  me: {
    id: string;
    name: string;
    email: string;
    organization?: {
      id: string;
      name: string;
    } | null;
  };
};
