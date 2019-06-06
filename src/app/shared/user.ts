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
  mutation createUser ($name: String, $nickname: String, $email: String, $password: String, $password_confirmation: String){
    createUser(user: {
        name: $name
        nickname: $nickname
        email: $email
        password: $password
        password_confirmation: $password_confirmation
    }) {
        status
        data {
          id
        }
    }
  }
`;
