
import React from 'react';
import ProjectCard, { Project } from './ProjectCard';
import { Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
          
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // This would open a preview in a real implementation
                      console.log('Preview visualization for project:', project.id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {onDeleteProject && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteProject(project.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete project</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
