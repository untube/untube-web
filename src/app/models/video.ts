import gql from "graphql-tag";

export class Video {
    id: string;
    user_id: number;
    category_id: string;
    video_id: string;
    title: string;
    description: string;
    views: number;
    originalname: string;
    filename: string;
    image:string;

  public constructor(init?: Partial<Video >) {
      Object.assign(this, init);
  }
}

export type Query = {
    allVideos: Video[];
    videoById: Video;
    videosByName: Video[];
    createdVideo: Video;
    videosByUser: Video[];
}

export const ALL_VIDEOS = gql ` 
    query allVideos{
    allVideos{
    id 
    title 
    description
    image
  }
}
`

export const VIDEO_BY_ID = gql ` 
query videoById($id: String!){
  videoById(id: $id){
    id 
    title 
    description
    image
  }
}
`

export const VIDEOS_BY_NAME = gql ` 
query videosByName($name: String!){
  videosByName(name: $name){
    id 
    title 
    description
    image
  }
}
`

export const VIDEOS_BY_USER = gql ` 
query videosByUser($id: Int!){
  videosByUser(id: $id){
    id 
    title 
    description
    image
  }
}
`

export const CREATE_VIDEO = gql `
mutation createVideo($user_id: Int!,$category_id: String!,$title: String!,$description: String!) {
    createVideo(video: {
      user_id: $user_id
      category_id: $category_id
      title: $title
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





