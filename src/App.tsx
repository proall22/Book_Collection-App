import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Library, PlusCircle, Search, BarChart2, BookOpen } from "lucide-react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import SearchBar from "./components/SearchBar";
import StatsPanel from "./components/StatsPanel";
import RecommendationsPanel from "./components/RecommendationsPanel";
import { Book } from "./types";

function App() {
	const [books, setBooks] = useState<Book[]>([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [showStats, setShowStats] = useState(false);
	const [showRecommendations, setShowRecommendations] = useState(false);

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/books");
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error("Error fetching books:", error);
		}
	};

	const handleSearch = async (query: string) => {
		setSearchQuery(query);
		try {
			const response = await fetch(
				`http://localhost:3000/api/books/search?query=${query}`
			);
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error("Error searching books:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
			<Toaster position="top-right" />

			<div className="container mx-auto px-4 py-8">
				<header className="mb-8">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<Library className="w-8 h-8 text-indigo-600" />
							<h1 className="text-3xl font-bold text-gray-800">
								Books Collection
							</h1>
						</div>
						<div className="flex gap-3">
							<button
								onClick={() => setShowStats(!showStats)}
								className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
							>
								<BarChart2 className="w-5 h-5" />
								Statistics
							</button>
							<button
								onClick={() => setShowRecommendations(!showRecommendations)}
								className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
							>
								<BookOpen className="w-5 h-5" />
								Recommendations
							</button>
							<button
								onClick={() => {
									setEditingBook(null);
									setIsFormOpen(true);
								}}
								className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
							>
								<PlusCircle className="w-5 h-5" />
								Add Book
							</button>
						</div>
					</div>
				</header>
				<SearchBar onSearch={handleSearch} />
			</div>

			{showStats && <StatsPanel onClose={() => setShowStats(false)} />}
			{showRecommendations && (
				<RecommendationsPanel onClose={() => setShowRecommendations(false)} />
			)}

			<BookList
				books={books}
				onEdit={(book) => {
					setEditingBook(book);
					setIsFormOpen(true);
				}}
				onDelete={fetchBooks}
			/>

			<BookForm
				isOpen={isFormOpen}
				onClose={() => {
					setIsFormOpen(false);
					setEditingBook(null);
				}}
				onSubmit={fetchBooks}
				editingBook={editingBook}
			/>
		</div>
	);
}

export default App;
