import { graphqlRequest } from "./graphqlRequest";
import { MeResponse } from "./types";

export const fetchMe = async () => {
  const data = await graphqlRequest<MeResponse>({
    query: `
      query {
        me {
          id
          name
          email
          organization {
            name
          }
        }
      }
    `,
  });
  return data.me;
};
