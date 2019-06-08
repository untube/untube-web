import {Video} from './video';
import gql from 'graphql-tag';

export class Category {
    id: string
    category: string
    description: string
}


export type Query = {

    allCategories: Category[];
    categoryById: Category;
    videosByCategoryId: Video[];
}

export const ALL_CATEGORIES = gql ` 
query allCategories{
    allCategories{
    id 
    category
    description
  }
}
`

export const VIDEO_BY_CATEGORY = gql ` 
query videosByCategoryId($id: String!){
  videosByCategoryId(id: $id){
    id 
    title 
    description
    destination
  }
}
`