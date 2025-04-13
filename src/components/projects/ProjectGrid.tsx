
import React from 'react';
import ProjectCard, { Project } from './ProjectCard';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectGridProps {
  projects: Project[];
  onDeleteProject?: (id: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onDeleteProject }) => {
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
          {onDeleteProject && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
