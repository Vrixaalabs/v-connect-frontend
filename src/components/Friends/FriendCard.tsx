import React from 'react';

type FriendCardProps = {
  user: { id: string; name: string };
  onAction: (id: string) => void;
  actionLabel?: string;
  loading?: boolean;
};

export function FriendCard({ user, onAction, actionLabel = 'Add Friend', loading }: FriendCardProps) {
  return (
    <div className="p-3 border rounded shadow-sm flex justify-between items-center mb-2">
      <span>{user.name}</span>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer"
        onClick={() => onAction(user.id)}
        disabled={loading}
      >
        {actionLabel}
      </button>
    </div>
  );
}