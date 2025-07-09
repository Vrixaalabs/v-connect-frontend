import { gql } from '@apollo/client';

export const GET_MY_SETTINGS = gql`
  query {
    getMySettings {
      profileVisibility
      friendRequestPermission
      notifications {
        friendRequest
        eventInvite
        alumniStatus
      }
    }
  }
`;
