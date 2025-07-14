import React from 'react';

type PendingRequestsProps = {
  requests: {
    id: string;
    sender: { id: string; name: string };
  }[];
  onRespond: (id: string, action: 'accept' | 'decline') => void;
};

export function PendingRequests({ requests, onRespond }: PendingRequestsProps) {
  if (!requests || requests.length === 0) return <p>No incoming requests</p>;

  return (
    <div>
      {requests.map(req => (
        <div key={req.id} className="flex justify-between items-center p-3 border rounded mb-2">
          <span>{req.sender.name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onRespond(req.id, 'accept')}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
            >
              Accept
            </button>
            <button
              onClick={() => onRespond(req.id, 'decline')}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}