import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Book } from '../types';
import toast from 'react-hot-toast';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Book deleted successfully');
        onDelete();
      } else {
        toast.error('Error deleting book');
      }
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No books found. Add some books to your collection!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-1">By {book.author}</p>
            <p className="text-gray-500 text-sm mb-1">ISBN: {book.isbn}</p>
            <p className="text-gray-500 text-sm mb-4">Published: {book.publishedYear}</p>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(book)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;