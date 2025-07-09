'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_SETTINGS } from '@/lib/graphql/queries/settings';
import { UPDATE_MY_SETTINGS } from '@/lib/graphql/mutations/settings';

export function SettingsForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      profileVisibility: '',
      friendRequestPermission: '',
      notifications: {
        friendRequest: false,
        eventInvite: false,
        alumniStatus: false,
      },
    },
  });

  const { data, loading } = useQuery(GET_MY_SETTINGS);
  const [updateSettings] = useMutation(UPDATE_MY_SETTINGS);

  useEffect(() => {
    if (data?.getMySettings) {
      reset(data.getMySettings);
    }
  }, [data, reset]);

  const onSubmit = async (values: any) => {
    await updateSettings({ variables: { input: values } });
    alert('✅ Settings saved!');
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        👁️ Profile Visibility
        <select {...register('profileVisibility')}>
          <option value="public">Public</option>
          <option value="university">University Only</option>
          <option value="private">Private</option>
        </select>
      </label>

      <label>
        🤝 Who can send you friend requests?
        <select {...register('friendRequestPermission')}>
          <option value="everyone">Everyone</option>
          <option value="university_only">University Only</option>
          <option value="no_one">No One</option>
        </select>
      </label>

      <label>🔔 Notifications</label>
      <label>
        <input type="checkbox" {...register('notifications.friendRequest')} />
        Friend Requests
      </label>
      <label>
        <input type="checkbox" {...register('notifications.eventInvite')} />
        Event Invites
      </label>
      <label>
        <input type="checkbox" {...register('notifications.alumniStatus')} />
        Alumni Status
      </label>

      <button type="submit">💾 Save Settings</button>
    </form>
  );
}
