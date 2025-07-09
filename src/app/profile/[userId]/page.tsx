'use client';

import React, { useState, useEffect } from 'react';
import { GET_USER_PROFILE } from '@/lib/graphql/queries/profile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PortfolioSection from '@/components/profile/portfolio/PortfolioSection';

//---PROFILE AND PROJECT INTERFACES---
interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

interface Profile {
  id: string;
  name?: string;
  department?: string;
  bio: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  degree?: string;
  graduationYear?: number;
}
//---END INTERFACES---


//---MOCK GET_USER_PROFILE QUERY---
interface GetUserProfileData {
  getUserProfile: {
    name: string;
    bio: string;
    department?: string;
    degree?: string;
    graduationYear?: number;
    linkedin?: string;
    github?: string;
    avatarUrl?: string;
    portfolio: Project[];
  };
}

//---Mock data for GET_USER_PROFILE based on userId
const mockUserProfiles: { [key: string]: GetUserProfileData } = {
  'user-123': {
    getUserProfile: {
      name: 'John Public',
      bio: 'A software engineer passionate about open source and community building. This is a public view bio.',
      department: 'Software Development',
      degree: 'B.Tech in Computer Science',
      graduationYear: 2020,
      linkedin: '',
      github: '',
      avatarUrl: 'https://placehold.co/120x120/336699/FFFFFF?text=JP',
      portfolio: [
        { title: 'Community Platform', description: 'Developed a community forum with real-time chat features.', link: 'https://example.com/community-platform', tags: ['React', 'Firebase'] },
        { title: 'Dev Blog', description: 'Personal blog on web development best practices.', link: 'https://example.com/dev-blog', tags: ['Next.js', 'Markdown'] },
      ],
    },
  },
  'user-456': {
    getUserProfile: {
      name: 'Emily Researcher',
      bio: 'PhD candidate focusing on AI ethics and responsible technology. Public view bio for researcher.',
      department: 'AI Research',
      degree: 'PhD in AI',
      graduationYear: 2025,
      linkedin: '',
      github: '',
      avatarUrl: 'https://placehold.co/120x120/993366/FFFFFF?text=ER',
      portfolio: [
        { title: 'Research Paper: AI Ethics', description: 'Published a paper on ethical considerations in AI development.', link: 'https://example.com/paper-ai-ethics', tags: ['AI Ethics', 'Research'] },
      ],
    },
  },
  //Add more mock users as needed for testing different scenarios
};

//---Mock useQuery hook for GET_USER_PROFILE
const useMockUserQuery = (query: any, options: { variables: { userId: string } }) => {
  const [data, setData] = useState<GetUserProfileData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const userData = mockUserProfiles[options.variables.userId];
        if (userData) {
          setData(userData);
        } else {
          setError(new Error(`User with ID "${options.variables.userId}" not found in mock data.`));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, options.variables.userId]);

  return { data, loading, error };
};


/**
 * PublicProfilePage component for displaying another user's profile.
 * This page is a client component and fetches data using Apollo Client's useQuery hook.
 * It receives the userId from the URL parameters.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters, containing userId.
 * @param {string} props.params.userId - The ID of the user whose profile is to be displayed.
 */
export default function PublicProfilePage({ params }: { params: { userId: string } }) {
  const userId = params.userId;

  const { data, loading, error } = useMockUserQuery(GET_USER_PROFILE, {
    variables: { userId: userId },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading user profile...
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        Error loading profile: {error.message}
      </div>
    );
  }

  if (!data || !data.getUserProfile) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        User profile not found.
      </div>
    );
  }

  const userProfile = data.getUserProfile;

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-10"> {/* Changed to match /profile styling */}
      {/*
        ProfileHeader will display consistent layout.
        'editable' is set to false to hide the "Edit Profile" button.
        linkedin/github links will be hidden by ProfileHeader if their values are empty strings.
      */}
      <ProfileHeader profile={userProfile} editable={false} onUpdateProfile={() => {}} />

      {/*
        PortfolioSection will display consistent layout.
        'editable' is set to false to hide the "Add Portfolio Item" form.
      */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> {/* Added main wrapper for consistent layout */}
        <PortfolioSection portfolio={userProfile.portfolio} editable={false} />
      </main>
    </div>
  );
}
