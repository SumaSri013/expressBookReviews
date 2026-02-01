const express = require('express');
const axios = require('axios');
const public_users = express.Router();

/**
 * TASK 10: Get all books using Axios + async/await
 */
public_users.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * TASK 11: Get book by ISBN using Axios + async/await
 */
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    const books = JSON.parse(response.data);
    const book = books[req.params.isbn];

    if (book) {
      return res.status(200).json(book);
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

/**
 * TASK 12: Get books by author using Axios + async/await
 */
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    const books = JSON.parse(response.data);

    const result = Object.values(books).filter(
      book => book.author === req.params.author
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
 * TASK 13: Get books by title using Axios + async/await
 */
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    const books = JSON.parse(response.data);

    const result = Object.values(books).filter(
      book => book.title === req.params.title
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
