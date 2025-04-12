
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  category?: string;
}

interface PlaceholderChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
}

const PlaceholderChart: React.FC<PlaceholderChartProps> = ({ 
  data, 
  title = "Sample Visualization", 
  height = 300 
}) => {
  const colors = ['#3b82f6', '#0ea5e9', '#06b6d4', '#0d9488', '#10b981', '#6366f1'];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '6px', 
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }} 
          />
          <Legend />
          <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlaceholderChart;
