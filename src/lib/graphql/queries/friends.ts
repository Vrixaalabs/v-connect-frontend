import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      id
      name
    }
  }
`;

export const GET_FRIEND_REQUESTS = gql`
  query {
    getFriendRequests {
      id
      sender {
        id
        name
      }
    }
  }
`;