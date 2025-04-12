
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockProjects';
import { Project } from '@/components/projects/ProjectCard';
import PlaceholderChart from '@/components/visualizations/PlaceholderChart';
import VisualizationControls, { VisualizationSettings } from '@/components/visualizations/VisualizationControls';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [visualizationSettings, setVisualizationSettings] = useState<VisualizationSettings>({
    chartType: 'bar',
    dateRange: { start: null, end: null },
    aggregation: 'monthly',
    parameterValue: 50,
  });
  
  // Sample data for visualizations
  const [chartData, setChartData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ]);

  useEffect(() => {
    // In a real app, we would fetch the project data
    const foundProject = mockProjects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  // Update visualization data when settings change
  useEffect(() => {
    // This would typically involve an API call to get new data based on settings
    // For demo purposes, we'll just modify the existing data
    const newData = chartData.map(item => ({
      ...item,
      value: item.value * (visualizationSettings.parameterValue / 50),
    }));
    setChartData(newData);
  }, [visualizationSettings]);

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 dashboard-container py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <Button asChild>
              <Link to="/">Back to Projects</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="dashboard-container">
          <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0 mb-4">
              <Link to="/" className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className={
                      tag.type === 'tech' 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Last updated on {formatDate(project.updatedAt)}
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg h-48 md:h-auto">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Interactive Visualizations</h2>
              
              <VisualizationControls 
                onSettingsChange={setVisualizationSettings}
                parameterName="Sample Size"
                parameterMin={10}
                parameterMax={100}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <PlaceholderChart 
                  data={chartData} 
                  title="Monthly Data Distribution"
                  height={300}
                />
                <PlaceholderChart 
                  data={chartData.map(item => ({ 
                    name: item.name, 
                    value: item.value * 0.75 + Math.random() * 100
                  }))} 
                  title="Comparison Analysis"
                  height={300}
                />
              </div>
              <PlaceholderChart 
                data={chartData.map(item => ({ 
                  name: item.name, 
                  value: item.value * 1.2
                }))} 
                title="Trend Analysis Over Time"
                height={400}
              />
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Methodology & Insights</h2>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Data Collection</h3>
                  <p className="mb-4">
                    This project utilizes data collected from multiple sources, processed using Python's Pandas library. 
                    The raw data underwent cleaning, normalization, and feature engineering to prepare it for analysis.
                  </p>
                  <p>
                    Statistical methods applied include regression analysis, time series forecasting, and cluster 
                    analysis to identify patterns and relationships within the dataset.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Findings</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Significant correlation between variables X and Y (p &lt; 0.001)</li>
                    <li>Seasonal patterns identified with 95% confidence interval</li>
                    <li>Clustering revealed 3 distinct customer segments</li>
                    <li>Predictive model achieved 87% accuracy on test data</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Conclusions</h3>
                  <p className="mb-4">
                    The analysis demonstrates that the proposed methodology effectively captures the underlying 
                    patterns in the data. The visualization tools developed provide intuitive access to complex 
                    information, enabling stakeholders to make data-driven decisions.
                  </p>
                  <p>
                    Future work could explore additional variables and apply more advanced machine learning 
                    techniques to improve prediction accuracy.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProjects.slice(0, 3).map((relatedProject) => (
                  <Link 
                    key={relatedProject.id} 
                    to={`/projects/${relatedProject.id}`}
                    className="block group"
                  >
                    <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-4">
                        <img 
                          src={relatedProject.thumbnail} 
                          alt={relatedProject.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
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

export default ProjectDetail;
