import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-api-url/graphql', // replace this with actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
