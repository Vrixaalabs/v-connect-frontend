import React, { useState, useEffect } from 'react';

//---MOCK SHADCN/UI DIALOG COMPONENTS---
//Dialog component (main container for the modal)
interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  //Simple logic to prevent scrolling when modal is open
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
      onClick={() => onOpenChange(false)} //Close when clicking outside
    >
      {children}
    </div>
  );
};

//DialogContent component (the actual modal content area)
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative ${className}`}
      onClick={(e) => e.stopPropagation()} //Prevent closing when clicking inside content
      {...props}
    >
      {children}
    </div>
  );
};

//DialogHeader component (for title and description)
interface DialogHeaderProps {
  children: React.ReactNode;
}
const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="text-center sm:text-left mb-4">
    {children}
  </div>
);

//DialogTitle component
interface DialogTitleProps {
  children: React.ReactNode;
}
const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h3 className="text-2xl font-bold text-gray-900">
    {children}
  </h3>
);

//DialogDescription component
interface DialogDescriptionProps {
  children: React.ReactNode;
}
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">
    {children}
  </p>
);

//DialogTrigger component (a button to open the modal)
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


//Defined the Profile interface based on GET_MY_PROFILE query
//Added 'department' field
interface Profile {
  id: string; //Assuming an ID for the profile
  name?: string;
  department?: string;
  bio: string;
  linkedin: string;
  github: string;
  avatarUrl?: string;
  degree?: string;
  graduationYear?: number;
}

//Define props for the EditProfileModal component
interface EditProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProfile: Partial<Profile>) => void; //Added onUpdate callback
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Profile>(profile);

  //Update form data when the profile prop changes (e.g., after initial fetch)
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

    //Simulate API call delay for mutation
    setTimeout(() => {
      console.log('Profile update simulated successfully!');
      onUpdate(formData); //Call the onUpdate callback with the new data
      onClose(); //Close the modal after successful update
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
          {/* Only render if name is part of the profile object */}
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
          {/* Only render if department is part of the profile object */}
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

export default ProfileHeader; //Export ProfileHeader as default
