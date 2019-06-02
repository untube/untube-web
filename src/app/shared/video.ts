import gql from "graphql-tag";

export class Video {
    id: string;
    user_id: number;
    category_id: string;
    title: string;
    description: string;
    destination: string;
    views: number;
    size: number;
    fieldname: string;
    originalname: string;
    encoding: string;
    filename: string;
}

export type Query = {
    allVideos: Video[];
    videoById: Video;
    videosByName: Video[];
}

export const ALL_VIDEOS = gql ` 
    query allVideos{
    allVideos{
    id 
    title 
    description
    destination
  }
}
`

export const VIDEO_BY_ID = gql ` 
query videoById($id: String!){
  videoById(id: $id){
    id 
    title 
    description
    destination 
  }
}
`

export const VIDEOS_BY_NAME = gql ` 
query videosByName($name: String!){
  videosByName(name: $name){
    id 
    title 
    description
    destination
  }
}
`
