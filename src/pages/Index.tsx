
/**
 * Main Index Page
 * 
 * This is the homepage of the DataVista application. It displays the project grid
 * with filtering capabilities and allows users to search for projects.
 * 
 * How to edit:
 * - To modify filters: Update the ProjectFilters component
 * - To change project display: Modify the ProjectGrid component
 * - To add search functionality: Adjust the handleSearch function
 */

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilters, { FilterOptions } from '@/components/projects/ProjectFilters';
import { Project } from '@/components/projects/ProjectCard';
import { mockProjects } from '@/data/mockProjects';

// Storage key for localStorage
const STORAGE_KEY = 'datavista-projects';

const Index = () => {
  // State variables
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    technologies: [],
  });

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects) as Project[];
        setProjects(parsedProjects);
        setFilteredProjects(parsedProjects);
      } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
        // Fallback to mock projects if there's an error
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      }
    } else {
      // Use mock projects for first-time users
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
    }
  }, []);

  // Get all unique categories and technologies for filter options
  const availableFilters = {
    categories: [...new Set(projects.flatMap(p => p.tags.filter(t => t.type === 'category').map(t => t.name)))],
    technologies: [...new Set(projects.flatMap(p => p.tags.filter(t => t.type === 'tech').map(t => t.name)))],
  };

  // Apply search and filters
  useEffect(() => {
    let result = projects;
    
    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(lowerSearchTerm) ||
          project.description.toLowerCase().includes(lowerSearchTerm) ||
          project.tags.some(tag => tag.name.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => 
          tag.type === 'category' && activeFilters.categories.includes(tag.name)
        )
      );
    }
    
    // Apply technology filters
    if (activeFilters.technologies.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => 
          tag.type === 'tech' && activeFilters.technologies.includes(tag.name)
        )
      );
    }
    
    setFilteredProjects(result);
  }, [searchTerm, activeFilters, projects]);

  // Handle search input from navbar
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle filter changes from ProjectFilters component
  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-1">
        <div className="dashboard-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Data Analysis Projects</h1>
            <p className="text-muted-foreground">
              Explore interactive data visualization projects powered by Python and modern web technologies.
            </p>
          </div>
          
          <ProjectFilters 
            onFilterChange={handleFilterChange}
            availableFilters={availableFilters}
          />
          
          <ProjectGrid 
            projects={filteredProjects}
          />
        </div>
      </main>
      
      <footer className="border-t py-6 bg-secondary/20">
        <div className="dashboard-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2025 DataVista. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
