
/**
 * Navbar Component
 * 
 * The main navigation bar of the application that includes:
 * - Logo and app name
 * - Navigation links
 * - Search functionality
 * - Dark mode toggle
 * 
 * How to edit:
 * - To add a new navigation link: Add a new Link component to the nav element
 * - To modify search: Update the form and handleSearch function
 * - To change the logo: Modify the Link component with the "D" span
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface NavbarProps {
  onSearch?: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  // State for search term and dark mode
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="dashboard-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-bold">D</span>
              </div>
              <span className="font-bold text-xl">DataVista</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium">Projects</Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">About</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-64 pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
