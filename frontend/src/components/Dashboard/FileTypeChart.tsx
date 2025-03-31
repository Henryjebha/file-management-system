import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface FileType {
  file_type: string;
  count: number;
}

interface FileTypeChartProps {
  fileTypes: FileType[];
}

const FileTypeChart: React.FC<FileTypeChartProps> = ({ fileTypes }) => {
  // Colors for different file types
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Format the data for the chart
  const chartData = fileTypes.map(item => ({
    name: item.file_type.toUpperCase(),
    value: item.count
  }));

  // If there's no data, show a message
  if (fileTypes.length === 0) {
    return <div className="text-center py-4 text-gray-500">No files uploaded yet</div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} files`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FileTypeChart;