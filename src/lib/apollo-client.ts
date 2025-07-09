import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT', // <--- IMPORTANT: Replace this with your actual backend GraphQL API URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
