'use client';

import { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SEARCH_USERS, GET_FRIEND_REQUESTS } from '@/lib/graphql/queries/friends';
import { SEND_FRIEND_REQUEST, RESPOND_TO_FRIEND_REQUEST } from '@/lib/graphql/mutations/friends';
import SearchBar from '@/components/Friends/SearchBar';
import { SearchResults } from '@/components/Friends/SearchResults';
import { PendingRequests } from '@/components/Friends/PendingRequests';

export default function FriendsPage() {
  const [query, setQuery] = useState('');
  const [searchUsers, { data: searchData }] = useLazyQuery(SEARCH_USERS);
  const { data: requestsData, refetch: refetchRequests } = useQuery(GET_FRIEND_REQUESTS);
  const [sendRequest, { loading: sending }] = useMutation(SEND_FRIEND_REQUEST);
  const [respondRequest] = useMutation(RESPOND_TO_FRIEND_REQUEST);

  const handleSearch = () => {
    if (query.trim()) searchUsers({ variables: { query } });
  };

  const handleSend = async (receiverId: string) => {
    try {
      await sendRequest({ variables: { receiverId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRespond = async (requestId: string, action: 'accept' | 'decline') => {
    try {
      await respondRequest({ variables: { requestId, action } });
      refetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[80vw] md:max-w-xl mx-auto mt-6 ">
      <h1 className="text-2xl font-bold mb-4">Find Friends</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <SearchResults users={searchData?.searchUsers ?? []} onAdd={handleSend} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Incoming Requests</h2>
      <PendingRequests requests={requestsData?.getFriendRequests ?? []} onRespond={handleRespond} />
    </div>
  );
}