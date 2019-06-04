import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

<<<<<<< HEAD
//const uri = 'http://192.168.99.103:5001/graphql'; //Graphql server URL
const uri = 'http://34.73.94.91:5000/graphql'
=======
const uri = 'http://34.73.14.85:5000/graphiql'; //Graphql server URL

>>>>>>> 45c39ce3be25004182cbd75f7bf644abfe666f38
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
