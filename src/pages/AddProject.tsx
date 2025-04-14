
/**
 * AddProject Page
 * 
 * A form page that allows users to add new data visualization projects.
 * It saves the project to localStorage and redirects to the home page on successful submission.
 * 
 * How to edit:
 * - To modify form fields: Update the form structure and validation
 * - To change the storage behavior: Modify the handleSubmit function
 * - To adjust validation: Update the formSchema
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';
import { Project } from '@/components/projects/ProjectCard';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  thumbnail: z.string().url({ message: 'Please enter a valid URL' }),
  categoryTag: z.string().min(1, { message: 'Category is required' }),
  techTag1: z.string().min(1, { message: 'At least one technology tag is required' }),
  techTag2: z.string().optional(),
});

// Form values type
type FormValues = z.infer<typeof formSchema>;

// Storage key for localStorage
const STORAGE_KEY = 'datavista-projects';

const AddProject = () => {
  const navigate = useNavigate();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      categoryTag: '',
      techTag1: '',
      techTag2: '',
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    // Create tags array from form values
    const tags = [
      { name: values.categoryTag, type: 'category' as const },
      { name: values.techTag1, type: 'tech' as const },
    ];
    
    if (values.techTag2) {
      tags.push({ name: values.techTag2, type: 'tech' as const });
    }
    
    // Get existing projects from localStorage
    const existingProjectsJSON = localStorage.getItem(STORAGE_KEY);
    let existingProjects: Project[] = [];
    
    if (existingProjectsJSON) {
      try {
        existingProjects = JSON.parse(existingProjectsJSON);
      } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
      }
    }
    
    // Generate a unique ID
    const maxId = existingProjects.length > 0 
      ? Math.max(...existingProjects.map(p => parseInt(p.id.toString()))) 
      : 0;
    const newId = String(maxId + 1);
    
    // Create new project object
    const newProject: Project = {
      id: newId,
      title: values.title,
      description: values.description,
      thumbnail: values.thumbnail,
      tags,
      updatedAt: new Date().toISOString(),
    };
    
    // Add new project to existing projects and save to localStorage
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    
    // Show success message and navigate to home page
    toast.success('Project added successfully');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="dashboard-container py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Add New Project</h1>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter project description" 
                            className="resize-none" 
                            rows={3} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="categoryTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Finance, Healthcare" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="techTag1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technology #1</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Pandas" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="techTag2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technology #2 (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., TensorFlow" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <CardFooter className="px-0 flex justify-end gap-2">
                    <Link to="/">
                      <Button variant="outline" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" /> Save Project
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
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

export default AddProject;
