
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export interface FilterOptions {
  categories: string[];
  technologies: string[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

interface ProjectFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableFilters: {
    categories: string[];
    technologies: string[];
  };
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFilterChange, availableFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(current => 
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  const handleTechnologyChange = (technology: string) => {
    setSelectedTechnologies(current => 
      current.includes(technology)
        ? current.filter(t => t !== technology)
        : [...current, technology]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      technologies: selectedTechnologies,
    });
    setOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    onFilterChange({
      categories: [],
      technologies: [],
    });
  };

  const removeFilter = (type: 'category' | 'technology', value: string) => {
    if (type === 'category') {
      const newCategories = selectedCategories.filter(c => c !== value);
      setSelectedCategories(newCategories);
      onFilterChange({
        categories: newCategories,
        technologies: selectedTechnologies,
      });
    } else {
      const newTechnologies = selectedTechnologies.filter(t => t !== value);
      setSelectedTechnologies(newTechnologies);
      onFilterChange({
        categories: selectedCategories,
        technologies: newTechnologies,
      });
    }
  };

  const activeFilterCount = selectedCategories.length + selectedTechnologies.length;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2 px-1 min-w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableFilters.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Technologies</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableFilters.technologies.map((technology) => (
                    <div key={technology} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tech-${technology}`} 
                        checked={selectedTechnologies.includes(technology)}
                        onCheckedChange={() => handleTechnologyChange(technology)}
                      />
                      <Label htmlFor={`tech-${technology}`} className="text-sm">{technology}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
                <Button size="sm" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {selectedCategories.map(category => (
              <Badge key={category} variant="outline" className="flex items-center gap-1 px-2 py-1">
                {category}
                <button onClick={() => removeFilter('category', category)} className="hover:bg-background/90 rounded-full">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </Badge>
            ))}
            
            {selectedTechnologies.map(technology => (
              <Badge key={technology} variant="outline" className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 border-indigo-200">
                {technology}
                <button onClick={() => removeFilter('technology', technology)} className="hover:bg-background/90 rounded-full">
                  <X className="h-3.5 w-3.5 text-indigo-600" />
                </button>
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs font-normal text-muted-foreground"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;
