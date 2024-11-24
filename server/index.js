import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { body, validationResult } from "express-validator";
import Book from "./models/Book.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
	.connect("mongodb://localhost:27017/books_collection")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Validation middleware
const validateBook = [
	body("title").notEmpty().trim().escape(),
	body("author").notEmpty().trim().escape(),
	body("isbn")
		.notEmpty()
		.matches(/^[\d-]{10,17}$/),
	body("publishedYear").isInt({ min: 1000, max: new Date().getFullYear() }),
];

// Basic CRUD Routes
app.get("/api/books", async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 });
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: "Error fetching books" });
	}
});

app.post("/api/books", validateBook, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const book = new Book(req.body);
		await book.save();
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ error: "Error creating book" });
	}
});

app.put("/api/books/:id", validateBook, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!book) return res.status(404).json({ error: "Book not found" });
		res.json(book);
	} catch (error) {
		res.status(400).json({ error: "Error updating book" });
	}
});

app.delete("/api/books/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		if (!book) return res.status(404).json({ error: "Book not found" });
		res.json({ message: "Book deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: "Error deleting book" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
