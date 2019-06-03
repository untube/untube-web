import gql from 'graphql-tag';

export class Commentary {
    id: number
    subject: string
    description: string
}

export type Query = {
    allCommentaries: Commentary[];
    CommentaryById: Commentary;
}

export const ALL_CATEGORIES = gql ` 
query allCommentaries{
    allCommentaries{
    id 
    category
    description
  }
}
`



