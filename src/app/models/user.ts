import gql from "graphql-tag";

export class User {
    id: string;
    name: number;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    favorite_category: String;
    check_conditions: String;
}


export const SIGN_UP = gql`
  mutation createUser ($name: String!, $nickname: String!, $email: String!, $password: String!, $password_confirmation: String!){
    createUser(user: {
        name: $name
        nickname: $nickname
        email: $email
        password: $password
        password_confirmation: $password_confirmation
    }) {
      token
      type
      client
    }
  }
`;


export const SIGN_IN = gql`
  mutation createSession ($email: String!, $password: String!){
    createSession(session: {
        email: $email
        password: $password
    }) {
      type
      token
      client
    }
  }
`;

export const AUTHORIZATION = gql`
  mutation auth ($email: String!, $password: String!) {
    auth(auth: {
      email: $email
      password: $password
    }){
      answer
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query validateToken ($client: String!, $uid: String!, $token: String!) {
    validateToken (headers: {
        client: $client
        uid: $uid
        token: $token
    }) {
      id
      name
      nickname  
      token
    }
  }
`;
