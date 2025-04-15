
/**
 * ProjectGrid Component
 * 
 * Displays a grid of ProjectCard components.
 * Shows a "No projects found" message when the grid is empty.
 * 
 * How to edit:
 * - To change grid layout: Modify the className in the grid div
 * - To change empty state: Update the message in the empty div
 */

import React from 'react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  // Display message when no projects are found
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="relative group">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
