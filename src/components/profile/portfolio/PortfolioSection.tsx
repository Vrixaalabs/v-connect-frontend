import React, { useState } from 'react';

//Re-defining the Project interface to ensure type consistency across components.
//In a larger project, this would typically be in a shared types file.
interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

//Importing the ProjectCard component.
//Assuming ProjectCard is defined in './ProjectCard' and default exported.
import ProjectCard from './ProjectCard'; //Changed to default import

//Define the props interface for the PortfolioSection component
interface PortfolioSectionProps {
  portfolio: Project[]; //An array of Project objects
  editable: boolean;    //A boolean to determine if the "Add" form should be shown
  onAddProject?: (newProject: { title: string; description: string }) => void; // New prop for adding projects
}

//Define the PortfolioSection functional component
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio, editable, onAddProject }) => {
  //State for the new project form (placeholder for now)
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleAddProject = () => {
    if (newProjectTitle && newProjectDescription) {
      //Call the onAddProject callback passed from the parent
      //This will update the portfolio state in ProfilePage
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

      {/* Grid for displaying ProjectCards */}
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

export default PortfolioSection;//Export PortfolioSection as default
