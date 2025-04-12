
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar, Database, BarChart2, Code2, Github, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const skills = [
    { name: 'Python', type: 'language' },
    { name: 'Pandas', type: 'library' },
    { name: 'scikit-learn', type: 'library' },
    { name: 'TensorFlow', type: 'library' },
    { name: 'Plotly', type: 'visualization' },
    { name: 'D3.js', type: 'visualization' },
    { name: 'React', type: 'frontend' },
    { name: 'Next.js', type: 'frontend' },
    { name: 'FastAPI', type: 'backend' },
    { name: 'SQL', type: 'database' },
    { name: 'MongoDB', type: 'database' },
    { name: 'Docker', type: 'devops' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="dashboard-container">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h1 className="text-4xl font-bold mb-4">About DataVista</h1>
              <p className="text-xl text-muted-foreground mb-8">
                A professional portfolio for interactive, Python-powered data analysis projects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-primary">
                      <Database className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold text-lg">Data Processing</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Leverage powerful Python data processing libraries including Pandas and NumPy to clean, 
                      transform, and analyze complex datasets.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-primary">
                      <BarChart2 className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold text-lg">Interactive Visualizations</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Create engaging, interactive visualizations using Plotly, D3.js, and other modern 
                      visualization libraries to convey insights effectively.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-primary">
                      <Code2 className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold text-lg">Modern Web Technologies</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Built with React, Next.js, and TailwindCSS for a responsive, performant experience 
                      across all devices and screen sizes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-primary">
                      <Calendar className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold text-lg">Regularly Updated</h3>
                    </div>
                    <p className="text-muted-foreground">
                      New projects and visualizations are added regularly, with existing projects 
                      updated to incorporate the latest data and methodologies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <Separator className="my-12" />
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Technologies & Skills</h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className={
                      skill.type === 'language' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      skill.type === 'library' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      skill.type === 'visualization' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      skill.type === 'frontend' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                      skill.type === 'backend' ? 'bg-green-50 text-green-700 border-green-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
              
              <p className="text-muted-foreground">
                DataVista combines the power of Python data analysis libraries with modern web technologies 
                to create a seamless, interactive experience. Each project is built with reproducibility and 
                transparency in mind, with methodologies clearly documented and explained.
              </p>
            </section>
            
            <Separator className="my-12" />
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
                  <Github className="h-6 w-6" />
                  <span>GitHub</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
                  <Linkedin className="h-6 w-6" />
                  <span>LinkedIn</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
                  <Mail className="h-6 w-6" />
                  <span>Email</span>
                </Button>
              </div>
            </section>
          </div>
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

export default About;
