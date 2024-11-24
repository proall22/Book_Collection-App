import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Stats {
  totalBooks: number;
  yearStats: Array<{ _id: number; count: number }>;
  topAuthors: Array<{ _id: string; count: number }>;
  lastUpdated: string;
}

interface StatsPanelProps {
  onClose: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ onClose }) => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!stats) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Library Statistics</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Overview</h3>
          <p className="text-3xl font-bold text-indigo-600 mb-2">
            {stats.totalBooks}
          </p>
          <p className="text-gray-600">Total Books in Collection</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Top Authors</h3>
          <ul className="space-y-2">
            {stats.topAuthors.map((author) => (
              <li key={author._id} className="flex justify-between">
                <span className="text-gray-700">{author._id}</span>
                <span className="font-semibold text-indigo-600">{author.count} books</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Publications by Year</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.yearStats.slice(0, 8).map((year) => (
              <div key={year._id} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-indigo-600">{year.count}</p>
                <p className="text-sm text-gray-600">{year._id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
};

export default StatsPanel;