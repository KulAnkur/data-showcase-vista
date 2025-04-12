
import React, { useState } from 'react';
import { Calendar, ChevronDown, BarChart2, PieChart, LineChart, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter';

export interface VisualizationSettings {
  chartType: ChartType;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  aggregation: 'daily' | 'weekly' | 'monthly';
  parameterValue: number;
}

interface VisualizationControlsProps {
  onSettingsChange: (settings: VisualizationSettings) => void;
  initialSettings?: Partial<VisualizationSettings>;
  parameterName?: string;
  parameterMin?: number;
  parameterMax?: number;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  onSettingsChange,
  initialSettings,
  parameterName = 'Parameter',
  parameterMin = 0,
  parameterMax = 100,
}) => {
  const [settings, setSettings] = useState<VisualizationSettings>({
    chartType: initialSettings?.chartType || 'bar',
    dateRange: initialSettings?.dateRange || { start: null, end: null },
    aggregation: initialSettings?.aggregation || 'daily',
    parameterValue: initialSettings?.parameterValue || parameterMin + (parameterMax - parameterMin) / 2,
  });

  const updateSettings = (updatedSettings: Partial<VisualizationSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-secondary/50 rounded-lg p-3">
      <div className="flex flex-wrap items-center gap-3">
        <Tabs 
          value={settings.chartType} 
          onValueChange={(value) => updateSettings({ chartType: value as ChartType })}
          className="h-9"
        >
          <TabsList>
            <TabsTrigger value="bar" className="px-2.5">
              <BarChart2 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="line" className="px-2.5">
              <LineChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="pie" className="px-2.5">
              <PieChart className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select
                  value={settings.aggregation}
                  onValueChange={(value) => 
                    updateSettings({ aggregation: value as 'daily' | 'weekly' | 'monthly' })
                  }
                >
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Select aggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-72">
          <Label htmlFor="parameter-slider" className="w-24 whitespace-nowrap">{parameterName}:</Label>
          <Slider
            id="parameter-slider"
            min={parameterMin}
            max={parameterMax}
            step={1}
            value={[settings.parameterValue]}
            onValueChange={([value]) => updateSettings({ parameterValue: value })}
            className="flex-1"
          />
          <span className="text-sm tabular-nums w-8 text-right">{settings.parameterValue}</span>
        </div>

        <Button size="sm" variant="outline" className="ml-auto h-9">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default VisualizationControls;
