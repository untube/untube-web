import gql from 'graphql-tag';

export class Commentary {
    id: number
    subject: string
    description: string
}

export type Query = {
    commentariesByVideo: Commentary[];
}

export const CREATE_COMMENTARY = gql`
  mutation createCommentary ($subject: String, $description: String, $id_user: Int, $id_video: String){
    createCommentary(commentary: {
        subject: $subject,
        description: $description,
        id_user: $id_user,
        id_video: $id_video
    }) {
      id
    }
  }
`;

export const COMMENTARIES_BY_VIDEO = gql ` 
    query commentariesByVideo($id: String!){
        commentariesByVideo(id: $id){
            subject 
            description 
            user_id
        }
    }
`;



