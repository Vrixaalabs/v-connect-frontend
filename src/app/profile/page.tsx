'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '@/lib/graphql/queries/profile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PortfolioSection from '@/components/profile/portfolio/PortfolioSection';

//---MOCK SHADCN/UI DIALOG COMPONENTS---
interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
}
const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="text-center sm:text-left mb-4">
    {children}
  </div>
);

interface DialogTitleProps {
  children: React.ReactNode;
}
const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h3 className="text-2xl font-bold text-gray-900">
    {children}
  </h3>
);

interface DialogDescriptionProps {
  children: React.ReactNode;
}
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">
    {children}
  </p>
);

interface DialogTriggerProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
  >
    {children}
  </button>
);
//---END MOCK SHADCN/UI DIALOG COMPONENTS---


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
  linkedin: string;
  github: string;
  avatarUrl?: string;
  degree?: string;
  graduationYear?: number;
}
//---END INTERFACES---


//---ProjectCard Component---
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 mb-4">
        {project.description}
      </p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium inline-block mb-4"
        >
          View Project
        </a>
      )}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
//---END ProjectCard Component---


//---PortfolioSection Component---
interface PortfolioSectionProps {
  portfolio: Project[];
  editable: boolean;
  onAddProject?: (newProject: { title: string; description: string }) => void; //New prop for adding projects
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio, editable, onAddProject }) => {
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleAddProject = () => {
    if (newProjectTitle && newProjectDescription) {
      onAddProject?.({ title: newProjectTitle, description: newProjectDescription });
      setNewProjectTitle('');
      setNewProjectDescription('');
    } else {
      console.log('Please fill in both title and description for the new project.');
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">My Portfolio</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {portfolio.length > 0 ? (
          portfolio.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No portfolio items to display yet.</p>
        )}
      </div>

      {editable && (
        <div className="mt-12 p-8 bg-white border border-gray-200 rounded-lg shadow-md max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Portfolio Item</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                id="projectTitle"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., My Awesome Web App"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="projectDescription"
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief description of your project..."
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleAddProject}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Project
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
//---END PortfolioSection Component---


//---EditProfileModal Component---
interface EditProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProfile: Partial<Profile>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Profile>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting to update profile with:', formData);

    setTimeout(() => {
      console.log('Profile update simulated successfully!');
      onUpdate(formData);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          {/* Name Field */}
          {formData.name !== undefined && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
          )}

          {/* Department Field */}
          {formData.department !== undefined && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="department" className="text-right text-gray-700">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Engineering, Marketing"
              />
            </div>
          )}

          {/* Bio Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="bio" className="text-right text-gray-700">
              Bio
            </label>
            <div className="col-span-3">
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>

          {/* LinkedIn Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="linkedin" className="text-right text-gray-700">
              LinkedIn
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          {/* GitHub Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="github" className="text-right text-gray-700">
              GitHub
            </label>
            <input
              id="github"
              name="github"
              type="url"
              value={formData.github}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
//---END EditProfileModal Component---


//---ProfileHeader Component---
interface ProfileHeaderProps {
  profile: Profile;
  editable: boolean;
  onUpdateProfile: (updatedProfile: Partial<Profile>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, editable, onUpdateProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 sm:p-12 rounded-b-lg shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatarUrl || 'https://placehold.co/120x120/4a90e2/ffffff?text=AVATAR'}
            alt={`${profile.name || 'User'}'s Avatar`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-extrabold mb-1">
            {profile.name || 'Your Name'}
          </h1>
          {profile.department && (
            <p className="text-blue-200 text-lg mb-2">
              {profile.department}
            </p>
          )}
          <p className="text-blue-100 text-md leading-relaxed">
            {profile.bio || 'A passionate professional eager to share their work and connect with others.'}
          </p>
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Edit Button (Conditional) */}
        {editable && (
          <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-auto">
            <DialogTrigger onClick={() => setIsModalOpen(true)}>
              Edit Profile
            </DialogTrigger>
          </div>
        )}
      </div>

      {/* EditProfileModal */}
      <EditProfileModal
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdateProfile}
      />
    </header>
  );
};
//---END ProfileHeader Component---


//---MOCK GET_MY_PROFILE QUERY---
interface GetMyProfileData {
  getMyProfile: {//Changed from 'myProfile' to 'getMyProfile' to match the query name
    name: string;
    bio: string;
    department: string;
    degree?: string;
    graduationYear?: number;
    linkedin?: string;
    github?: string;
    avatarUrl?: string;
    portfolio: Project[];
  };
}

// Mock data for GET_MY_PROFILE
const mockMyProfileData: GetMyProfileData = {
  getMyProfile: {//Changed from 'myProfile' to 'getMyProfile'
    name: 'Buri Buri Zaimon',
    department: 'Part-Time Warrior',
    bio: 'A visionary warrior with a knack for transforming complex enemies into friends by offering monetary support. Experienced in agile methodologies and fallback plans.',
    linkedin: 'https://www.linkedin.com/in/tumit-dass/',
    github: 'https://github.com/Tes-miT',
    avatarUrl: 'https://cdn.discordapp.com/attachments/1392121542367903807/1392160962676789358/LmpwZw.png?ex=686e866e&is=686d34ee&hm=7b3239ab508a1c502caf7459974954eb5859f2449076f389f8694d4a3ac3a941&',
    portfolio: [
      {
        title: 'AI-Powered Chatbot',
        description: 'Designed and launched an intelligent chatbot for customer support, reducing inquiry resolution time by 30%.',
        link: 'https://example.com/chatbot-project',
        tags: ['AI', 'NLP', 'Product Management', 'Customer Support']
      },
      {
        title: 'Mobile App Redesign',
        description: 'Led the UX/UI redesign of a popular mobile application, resulting in a 20% increase in user engagement.',
        link: 'https://example.com/mobile-app-redesign',
        tags: ['UX/UI', 'Mobile', 'Product Design', 'User Engagement']
      },
      {
        title: 'Data Analytics Dashboard',
        description: 'Developed an interactive dashboard for sales data visualization, empowering stakeholders with real-time insights.',
        link: 'https://example.com/analytics-dashboard',
        tags: ['Data Visualization', 'Business Intelligence', 'Product Analytics']
      }
    ]
  }
};

//Mock useQuery hook
//This simulates Apollo Client's useQuery, including loading and error states.
//For the actual Apollo Client, import useQuery from '@apollo/client' and remove this mock.
const useMockQuery = (query: any) => {//'query' parameter is not strictly used in this mock, but kept for signature consistency
  const [data, setData] = useState<GetMyProfileData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        //Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setData(mockMyProfileData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]); //In a real app, 'query' would be a GraphQL document

  return { data, loading, error };
};
//---END MOCK GET_MY_PROFILE QUERY---


//---Main ProfilePage Component---
const ProfilePage: React.FC = () => {
  //Using the mock useQuery to simulate fetching data
  //When the backend is ready, replace `useMockQuery` with `useQuery` from '@apollo/client'
  const { data, loading, error } = useMockQuery(GET_MY_PROFILE);

  //State to hold the profile data that can be updated by the modal
  const [currentProfile, setCurrentProfile] = useState<Profile | undefined>(undefined);
  const [currentPortfolio, setCurrentPortfolio] = useState<Project[] | undefined>(undefined);

  //Update local state when data is fetched
  useEffect(() => {
    if (data && data.getMyProfile) {//Ensure data.getMyProfile exists
      setCurrentProfile(data.getMyProfile);
      setCurrentPortfolio(data.getMyProfile.portfolio);
    }
  }, [data]);

  //Callback function to update the profile state
  const handleProfileUpdate = (updatedData: Partial<Profile>) => {
    setCurrentProfile((prevProfile) => {
      if (prevProfile) {
        return { ...prevProfile, ...updatedData };
      }
      return undefined;
    });
  };

  //Callback function to add a new project to the portfolio
  const handleAddPortfolioItem = (newProject: { title: string; description: string }) => {
    setCurrentPortfolio((prevPortfolio) => {
      if (prevPortfolio) {
        //Create a new Project object, ensuring it matches the Project interface
        const projectToAdd: Project = {
          ...newProject,
          link: undefined, //Or a default link if applicable
          tags: [], //Or default tags
        };
        return [...prevPortfolio, projectToAdd];
      }
      return [];
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-xl font-semibold text-gray-700">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-xl font-semibold text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  //Ensure data is available before rendering
  if (!currentProfile || !currentPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-xl font-semibold text-gray-700">No profile data available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-10">
      {/* Profile Header Section */}
      <ProfileHeader
        profile={currentProfile}
        editable={true} //User's own profile, so it's editable
        onUpdateProfile={handleProfileUpdate}
      />

      {/* Main content area for portfolio */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PortfolioSection
          portfolio={currentPortfolio}
          editable={true} //User's own profile, so adding portfolio items is enabled
          onAddProject={handleAddPortfolioItem}
        />
      </main>
    </div>
  );
};

export default ProfilePage; //Export the actual ProfilePage component
