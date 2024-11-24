import mongoose from 'mongoose';
import Book from './models/Book.js';

const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-0525559474",
    publishedYear: 2020,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    publishedYear: 1965,
    coverImage: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=2088&ixlib=rb-4.0.3"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "978-0593135204",
    publishedYear: 2021,
    coverImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3"
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    isbn: "978-1501161933",
    publishedYear: 2017,
    coverImage: "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?auto=format&fit=crop&q=80&w=2022&ixlib=rb-4.0.3"
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    isbn: "978-0553293357",
    publishedYear: 1951,
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2011&ixlib=rb-4.0.3"
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    isbn: "978-0571364879",
    publishedYear: 2021,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?auto=format&fit=crop&q=80&w=2127&ixlib=rb-4.0.3"
  },
  {
    title: "Cloud Atlas",
    author: "David Mitchell",
    isbn: "978-0375507250",
    publishedYear: 2004,
    coverImage: "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
  },
  {
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    isbn: "978-0765382030",
    publishedYear: 2014,
    coverImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3"
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3"
  },
  {
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    isbn: "978-0765387561",
    publishedYear: 2020,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=2098&ixlib=rb-4.0.3"
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    isbn: "978-0756404741",
    publishedYear: 2007,
    coverImage: "https://images.unsplash.com/photo-1518504269255-940f975b5cd3?auto=format&fit=crop&q=80&w=2076&ixlib=rb-4.0.3"
  },
  {
    title: "The Song of Achilles",
    author: "Madeline Miller",
    isbn: "978-0062060617",
    publishedYear: 2011,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3"
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    isbn: "978-0441569595",
    publishedYear: 1984,
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3"
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    isbn: "978-0385490818",
    publishedYear: 1985,
    coverImage: "https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/books_collection');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert new data
    await Book.insertMany(books);
    console.log('Successfully seeded database with sample books');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();