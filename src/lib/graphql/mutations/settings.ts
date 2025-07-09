import { gql } from '@apollo/client';

export const UPDATE_MY_SETTINGS = gql`
  mutation UpdateMySettings($input: UpdateSettingsInput!) {
    updateMySettings(input: $input) {
      profileVisibility
      notifications {
        eventInvite
      }
    }
  }
`;
