export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}