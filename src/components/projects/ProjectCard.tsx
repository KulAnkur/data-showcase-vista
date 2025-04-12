
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: Array<{
    name: string;
    type: 'category' | 'tech';
  }>;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getTagClassName = (tag: { name: string; type: string }) => {
    if (tag.type === 'tech') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    
    // Category tags
    switch (tag.name.toLowerCase()) {
      case 'finance':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'healthcare':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'marketing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="h-full overflow-hidden card-hover">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`text-xs ${getTagClassName(tag)}`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Updated {formatDate(project.updatedAt)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
