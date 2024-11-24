import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Book } from '../types';

interface RecommendationsPanelProps {
  onClose: () => void;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ onClose }) => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/books/recommendations');
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recommended Books</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchRecommendations}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((book) => (
          <div
            key={book._id}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 shadow-sm"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-1">By {book.author}</p>
            <p className="text-gray-500 text-sm">{book.publishedYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPanel;