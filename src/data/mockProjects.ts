
import { Project } from '@/components/projects/ProjectCard';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Financial Market Trend Analysis',
    description: 'Analysis of stock market trends over the past decade using time series forecasting and advanced visualizations.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Finance', type: 'category' },
      { name: 'Time Series', type: 'tech' },
      { name: 'Pandas', type: 'tech' }
    ],
    updatedAt: '2025-03-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Healthcare Patient Outcome Prediction',
    description: 'Machine learning model to predict patient outcomes based on historical medical data and treatment protocols.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Healthcare', type: 'category' },
      { name: 'ML', type: 'tech' },
      { name: 'scikit-learn', type: 'tech' }
    ],
    updatedAt: '2025-04-02T14:45:00Z',
  },
  {
    id: '3',
    title: 'E-commerce Customer Segmentation',
    description: 'Clustering analysis to identify distinct customer segments and personalized marketing strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Marketing', type: 'category' },
      { name: 'Clustering', type: 'tech' },
      { name: 'NumPy', type: 'tech' }
    ],
    updatedAt: '2025-02-28T09:15:00Z',
  },
  {
    id: '4',
    title: 'Social Media Sentiment Analysis',
    description: 'Natural language processing to analyze sentiment patterns across social media platforms during major events.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Social Media', type: 'category' },
      { name: 'NLP', type: 'tech' },
      { name: 'NLTK', type: 'tech' }
    ],
    updatedAt: '2025-03-21T16:20:00Z',
  },
  {
    id: '5',
    title: 'Supply Chain Optimization Model',
    description: 'Mathematical optimization to improve logistics efficiency and reduce delivery times across global supply networks.',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Logistics', type: 'category' },
      { name: 'Optimization', type: 'tech' },
      { name: 'SciPy', type: 'tech' }
    ],
    updatedAt: '2025-01-12T11:40:00Z',
  },
  {
    id: '6',
    title: 'Climate Change Impact Assessment',
    description: 'Analysis of global temperature and weather pattern changes with projections based on various climate models.',
    thumbnail: 'https://images.unsplash.com/photo-1569180880150-df4eed93c90b?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Environment', type: 'category' },
      { name: 'Geospatial', type: 'tech' },
      { name: 'Matplotlib', type: 'tech' }
    ],
    updatedAt: '2025-04-05T08:30:00Z',
  },
  {
    id: '7',
    title: 'Urban Traffic Flow Prediction',
    description: 'Deep learning models to predict and optimize traffic flow in urban environments to reduce congestion.',
    thumbnail: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Transportation', type: 'category' },
      { name: 'TensorFlow', type: 'tech' },
      { name: 'Deep Learning', type: 'tech' }
    ],
    updatedAt: '2025-02-18T13:55:00Z',
  },
  {
    id: '8',
    title: 'Energy Consumption Forecasting',
    description: 'Time series analysis to predict energy consumption patterns and optimize resource allocation for utilities.',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Energy', type: 'category' },
      { name: 'Forecasting', type: 'tech' },
      { name: 'Plotly', type: 'tech' }
    ],
    updatedAt: '2025-03-09T10:10:00Z',
  },
  {
    id: '9',
    title: 'Fraud Detection System',
    description: 'Anomaly detection algorithms to identify potentially fraudulent transactions in financial systems.',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format&fit=crop',
    tags: [
      { name: 'Finance', type: 'category' },
      { name: 'Anomaly Detection', type: 'tech' },
      { name: 'XGBoost', type: 'tech' }
    ],
    updatedAt: '2025-04-01T15:25:00Z',
  }
];
