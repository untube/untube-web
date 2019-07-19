import {Video} from './video';
import gql from 'graphql-tag';

export type QueryRecommendation = {
    recommendationsByUser: Video[];
}

export const RECOMMENDATIONS_BY_USER = gql ` 
query recommendationsByUser($code: Int!){
    recommendationsByUser(code: $code){
    id 
    title 
    description
    image
    category_id
  }
}
`

export const FEED_VIDEO_DB = gql `
mutation feedVideoDB($id_video: String!,$id_category: String!,$calification: Int!) {
    feedVideoDB(videosStatistics: {
      id_video: $id_video
      id_category: $id_category
      calification: $calification
    })
  }
`

export const FEED_USER_DB = gql `
mutation feedUserDB($id_user: Int!,$id_category: String!) {
    feedUserDB(userPreferences: {
      id_user: $id_user
      id_category: $id_category
    })
  }
`

export const DELETE_VB = gql `
mutation purgeVideoDB($id: String!) {
    feedUserDB(id: $id)
  }
`
