import { gql } from '@apollo/client';

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($receiverId: ID!) {
    sendFriendRequest(receiverId: $receiverId) {
      id
      status
    }
  }
`;

export const RESPOND_TO_FRIEND_REQUEST = gql`
  mutation RespondToFriendRequest($requestId: ID!, $action: String!) {
    respondToFriendRequest(requestId: $requestId, action: $action)
  }
`;