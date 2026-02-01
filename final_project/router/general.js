const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// TASK 10: Get all books using async/await
public_users.get('/async/books', async (req, res) => {
  const result = await Promise.resolve(books);
  return res.status(200).json(JSON.stringify(result, null, 2));
});

// TASK 11: Get book by ISBN
public_users.get('/async/isbn/:isbn', async (req, res) => {
  const book = await Promise.resolve(books[req.params.isbn]);
  if (book) return res.status(200).json(book);
  return res.status(404).json({ message: "Book not found" });
});

// TASK 12: Get books by author
public_users.get('/async/author/:author', async (req, res) => {
  const result = Object.values(books).filter(
    book => book.author === req.params.author
  );
  return res.status(200).json(result);
});

// TASK 13: Get books by title
public_users.get('/async/title/:title', async (req, res) => {
  const result = Object.values(books).filter(
    book => book.title === req.params.title
  );
  return res.status(200).json(result);
});

module.exports.general = public_users;
