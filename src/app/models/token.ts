import gql from "graphql-tag";

export class Token {
    id: string;
    token: string;
}


export type TokenQuery = {
    validateToken:Token;
}


export const IS_AUTHENTICATED = gql`
  query validateToken ($client: String!, $uid: String!, $token: String!) {
    validateToken (headers: {
        client: $client
        uid: $uid
        token: $token
    }) {
      id
      token
    }
  }
`;