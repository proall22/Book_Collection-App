# Books Collection Application

#To ShowCase RESTful API with Database Integration and Data Validation

Simple frontend and backend integration for managing book collection. Built with React, Node.js(Express), and MongoDB.

![Books Collection App](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=228&ixlib=rb-4.0.3)

## Features

- 📚 Manage your book collection with ease
- 🔍 Search books by title, author, or ISBN
- 📱 Responsive design for all devices
- 🎨 Beautiful UI with smooth transitions
- ✨ Real-time feedback with toast notifications
- 🔒 Data validation and error handling
- 📸 Book cover image support

## Tech Stack

- **Frontend:**

  - React with TypeScript
  - Tailwind CSS for styling
  - Lucide React for icons
  - React Hot Toast for notifications

- **Backend:**
  - Node.js with Express
  - MongoDB with Mongoose
  - Express Validator for data validation
  - CORS for cross-origin requests

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/proall22/Book_Collection-App.git
   cd Books-Collection-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB:

   ```bash
   # On macOS/Linux
   mongod

   # On Windows
   net start MongoDB
   ```

4. Start the development servers:
   ```bash
   npm run dev:full
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api/books/search?query=:query` - Search books
- and more features...

### Request Body Format

```typescript
{
  title: string;        // Required
  author: string;       // Required
  isbn: string;         // Required, format: XXX-XXXXXXXXXX
  publishedYear: number;// Required, between 1000 and current year
  coverImage?: string;  // Optional, URL to book cover
}
```

## Development

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/                  # Frontend source files
│   ├── components/       # React components
│   ├── types/           # TypeScript types
│   └── App.tsx          # Main application component
├── server/              # Backend source files
│   ├── models/          # MongoDB models
│   └── index.js         # Express server setup
├── public/              # Static files
└── package.json         # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Author

- Misgana Tegegn
- [github page](https://github.com/proall22/)
- [live site](https://book-db-simple.vercel.app/)

  # Contact me

  ## Contact I’m always open to discussing new projects, collaborations, or sharing knowledge. Feel free to reach out:

- **Email**: [email](misganategegn0@gmail.com)
- **LinkedIn**: [linkedin.com/in/misgana-bb46bb288](https://linkedin.com/in/misgana-bb46bb288)
- **GitHub**: [github.com/proall22](https://github.com/proall22)
- **Twitter**: [@Misgu2na](https://twitter.com/Misgu2na)
