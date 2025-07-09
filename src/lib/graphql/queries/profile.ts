import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query {
    getMyProfile {
      name bio department degree graduationYear
      linkedin github avatarUrl
      portfolio { title description link tags }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      name bio department degree graduationYear
      portfolio { title link }
    }
  }
`;