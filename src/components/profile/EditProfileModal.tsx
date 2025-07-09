import React, { useState, useEffect } from 'react';

// --- MOCK SHADCN/UI DIALOG COMPONENTS (for demonstration purposes) ---
// In a real project, you would import these from "@shadcn/ui/components/ui/dialog"
// For this example, we define them simply to illustrate the structure.

// Dialog component (main container for the modal)
interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  // Simple logic to prevent scrolling when modal is open
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
      onClick={() => onOpenChange(false)} // Close when clicking outside
    >
      {children}
    </div>
  );
};

// DialogContent component (the actual modal content area)
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative ${className}`}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      {...props}
    >
      {children}
    </div>
  );
};

// DialogHeader component (for title and description)
interface DialogHeaderProps {
  children: React.ReactNode;
}
const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="text-center sm:text-left mb-4">
    {children}
  </div>
);

// DialogTitle component
interface DialogTitleProps {
  children: React.ReactNode;
}
const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h3 className="text-2xl font-bold text-gray-900">
    {children}
  </h3>
);

// DialogDescription component
interface DialogDescriptionProps {
  children: React.ReactNode;
}
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">
    {children}
  </p>
);

// DialogTrigger component (a button to open the modal)
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
// --- END MOCK SHADCN/UI DIALOG COMPONENTS ---


// Define the Profile interface based on your GET_MY_PROFILE query
interface Profile {
  id: string;
  bio: string;
  linkedin: string;
  github: string;
  // Add other profile fields as needed, e.g., name, avatar, etc.
  name?: string;
  avatarUrl?: string;
}

// Define props for the EditProfileModal component
interface EditProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  // In a real app, you might pass an onUpdate callback
  // onUpdate: (updatedProfile: Partial<Profile>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, isOpen, onClose }) => {
  // --- MOCK REACT-HOOK-FORM STATE MANAGEMENT ---
  // In a real application, you would use `useForm` from 'react-hook-form'
  // const { register, handleSubmit, reset } = useForm<Profile>({
  //   defaultValues: profile,
  // });

  const [formData, setFormData] = useState<Profile>(profile);
  // Removed: const [isGeneratingBio, setIsGeneratingBio] = useState(false); // State for LLM loading

  // Effect to update form data when the profile prop changes (e.g., after initial load)
  useEffect(() => {
    setFormData(profile);
    // In react-hook-form, you would use reset(profile) here
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Removed: Function to call Gemini API for bio enhancement
  // const handleEnhanceBio = async () => {
  //   setIsGeneratingBio(true);
  //   const prompt = `Enhance the following professional bio. Make it concise, impactful, and suitable for a developer's profile. If the bio is empty, suggest a general professional bio for a software developer.
  //   Current Bio: "${formData.bio}"`;

  //   let chatHistory = [];
  //   chatHistory.push({ role: "user", parts: [{ text: prompt }] });
  //   const payload = { contents: chatHistory };
  //   const apiKey = ""; // Leave this as-is; Canvas will provide the API key at runtime
  //   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload)
  //     });
  //     const result = await response.json();

  //     if (result.candidates && result.candidates.length > 0 &&
  //         result.candidates[0].content && result.candidates[0].content.parts &&
  //         result.candidates[0].content.parts.length > 0) {
  //       const generatedText = result.candidates[0].content.parts[0].text;
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         bio: generatedText,
  //       }));
  //     } else {
  //       console.error('Gemini API response structure unexpected:', result);
  //       // Optionally, show an error message to the user
  //     }
  //   } catch (error) {
  //     console.error('Error calling Gemini API:', error);
  //     // Optionally, show an error message to the user
  //   } finally {
  //     setIsGeneratingBio(false);
  //   }
  // };

  // --- MOCK APOLLO CLIENT MUTATION ---
  // In a real application, you would use `useMutation` from '@apollo/client'
  // const [updateProfile, { loading, error }] = useMutation(UPDATE_MY_PROFILE);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Attempting to update profile with:', formData);

    // --- MOCK MUTATION CALL ---
    // In a real application:
    // try {
    //   const { data } = await updateProfile({ variables: { input: formData } });
    //   console.log('Profile updated successfully:', data);
    //   // onUpdate(data.updateMyProfile); // Call a callback to update parent state
    //   onClose(); // Close modal on success
    // } catch (err) {
    //   console.error('Error updating profile:', err);
    //   // Display error message to user
    // }

    // Simulate API call delay
    setTimeout(() => {
      console.log('Profile update simulated successfully!');
      onClose(); // Close modal after simulated update
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
              {/* Removed: Enhance Bio button */}
              {/* <button
                type="button"
                onClick={handleEnhanceBio}
                disabled={isGeneratingBio}
                className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingBio ? 'Generating...' : '✨ Enhance Bio'}
              </button> */}
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

          {/* Other fields can be added here following the same pattern */}
          {/* Example: Name field */}
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

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              // disabled={loading} // In a real app, disable while loading
            >
              {/* {loading ? 'Saving...' : 'Save changes'} */}
              Save changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- Main App Component to demonstrate EditProfileModal ---
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile>({
    id: 'user-123',
    bio: 'Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. Always eager to learn and build impactful applications.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    name: 'John Doe',
    avatarUrl: 'https://placehold.co/100x100/aabbcc/ffffff?text=JD'
  });

  // Function to simulate updating the profile in the parent component
  const handleProfileUpdate = (updatedData: Partial<Profile>) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedData,
    }));
    console.log('Parent state updated with:', updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile Dashboard</h1>

      {/* Display current profile details */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <img src={userProfile.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
        <h2 className="text-2xl font-semibold text-gray-800">{userProfile.name}</h2>
        <p className="text-gray-600 mt-2">{userProfile.bio}</p>
        <div className="mt-4 space-y-2">
          {userProfile.linkedin && (
            <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
              LinkedIn
            </a>
          )}
          {userProfile.github && (
            <a href={userProfile.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
              GitHub
            </a>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit Profile
        </button>
      </div>

      {/* The EditProfileModal */}
      <EditProfileModal
        profile={userProfile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onUpdate={handleProfileUpdate} // Pass this if you implement actual update logic
      />
    </div>
  );
};

export default App;
