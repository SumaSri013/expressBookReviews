const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

/**
 * TASK 10:
 * Get all books using async/await with Axios
 */
public_users.get('/async/books', async (req, res) => {
  try {
    // Axios call to fetch books from the same server
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * TASK 11:
 * Get book details by ISBN using async/await with Axios
 */
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const response = await axios.get('http://localhost:5000/');
    const booksData = JSON.parse(response.data);

    if (booksData[isbn]) {
      return res.status(200).json(booksData[isbn]);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

/**
 * TASK 12:
 * Get books by author using async/await with Axios
 */
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const author = req.params.author;

    const response = await axios.get('http://localhost:5000/');
    const booksData = JSON.parse(response.data);

    const result = Object.values(booksData).filter(
      book => book.author === author
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});

/**
 * TASK 13:
 * Get books by title using async/await with Axios
 */
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const title = req.params.title;

    const response = await axios.get('http://localhost:5000/');
    const booksData = JSON.parse(response.data);

    const result = Object.values(booksData).filter(
      book => book.title === title
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});

module.exports.general = public_users;
