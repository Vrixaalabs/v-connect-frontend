import React from 'react';
import { FriendCard } from './FriendCard';

type SearchResultsProps = {
  users: { id: string; name: string }[];
  onAdd: (id: string) => void;
};

export function SearchResults({ users, onAdd }: SearchResultsProps) {
  if (!users || users.length === 0) return null;

  return (
    <div>
      {users.map(user => (
        <FriendCard key={user.id} user={user} onAction={onAdd} actionLabel="Add Friend" />
      ))}
    </div>
  );
}