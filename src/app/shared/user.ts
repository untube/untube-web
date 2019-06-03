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

