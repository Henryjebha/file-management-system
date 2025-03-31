import React, { useEffect, useState } from 'react';
import { getFileStats } from '../../services/file.service';
import { getCurrentUser } from '../../services/user.service';
import { FileStats } from '../../types/file.types';
import { User } from '../../types/user.types';
import FileTypeChart from './FileTypeChart';
import StatsCard from './StatsCard';

const Dashboard: React.FC = () => {
  const [fileStats, setFileStats] = useState<FileStats | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, userData] = await Promise.all([
          getFileStats(),
          getCurrentUser()
        ]);
        setFileStats(stats);
        setUser(userData);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading dashboard...</div>;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Files"
          value={fileStats?.total_files || 0}
          icon="📁"
          color="bg-blue-500"
        />
        {/* Additional stats cards can go here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">File Types Breakdown</h2>
          {fileStats && <FileTypeChart fileTypes={fileStats.file_types} />}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Recent activity content */}
          <p className="text-gray-500">Activity tracking coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;