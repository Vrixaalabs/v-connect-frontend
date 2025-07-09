export const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateUserInput!) {
    updateMyProfile(input: $input) {
      name bio department portfolio { title }
    }
  }
`;