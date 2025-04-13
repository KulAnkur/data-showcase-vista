
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Project } from './ProjectCard';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

interface AddProjectDialogProps {
  onAddProject: (project: Omit<Project, 'id'>) => void;
}

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  thumbnail: z.string().url({ message: 'Please enter a valid URL' }),
  categoryTag: z.string().min(1, { message: 'Category is required' }),
  techTag1: z.string().min(1, { message: 'At least one technology tag is required' }),
  techTag2: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ onAddProject }) => {
  const [open, setOpen] = useState(false);
  
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

  const onSubmit = (values: FormValues) => {
    const tags = [
      { name: values.categoryTag, type: 'category' as const },
      { name: values.techTag1, type: 'tech' as const },
    ];
    
    if (values.techTag2) {
      tags.push({ name: values.techTag2, type: 'tech' as const });
    }
    
    onAddProject({
      title: values.title,
      description: values.description,
      thumbnail: values.thumbnail,
      tags,
      updatedAt: new Date().toISOString(),
    });
    
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div>
                <Label htmlFor="categoryTag">Category</Label>
                <Input 
                  id="categoryTag"
                  placeholder="e.g., Finance, Healthcare" 
                  {...form.register('categoryTag')} 
                />
                {form.formState.errors.categoryTag && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {form.formState.errors.categoryTag.message}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="techTag1">Technology #1</Label>
                  <Input 
                    id="techTag1"
                    placeholder="e.g., Pandas" 
                    {...form.register('techTag1')} 
                  />
                  {form.formState.errors.techTag1 && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {form.formState.errors.techTag1.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="techTag2">Technology #2 (Optional)</Label>
                  <Input 
                    id="techTag2"
                    placeholder="e.g., TensorFlow" 
                    {...form.register('techTag2')} 
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
