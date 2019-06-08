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

  public constructor(init?: Partial<Video >) {
      Object.assign(this, init);
  }
}

export type Query = {
    allVideos: Video[];
    videoById: Video;
    videosByName: Video[];
    createdVideo: Video;
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

export const CREATE_VIDEO = gql `
mutation createVideo($user_id: Int!,$category_id: String!,$title: String!,$destination: String!,
  $description: String!) {
    createVideo(video: {
      user_id: $user_id
      category_id: $category_id
      title: $title
      destination: $destination
      description: $description
    }){
        id
        title
    }
  }
`

export const DELETE_VIDEO = gql `
mutation deleteVideo($id: String!) {
    deleteVideo(id: $id ){
      ok
    }
  }
`





