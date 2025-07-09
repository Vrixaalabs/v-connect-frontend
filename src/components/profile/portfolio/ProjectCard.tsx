import React from 'react';

//Define the Project interface for consistency
interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

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

export default ProjectCard;//Export ProjectCard as default
