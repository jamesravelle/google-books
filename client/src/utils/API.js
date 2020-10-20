import axios from "axios";

// const APIkey = process.env.REACT_APP_GOOGLE_API_KEY;


export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  getGoogleBooks: function(book, author) {
    const URLbook = book.split(" ").join("&") + "xxx" + author.split(" ").join("&");
    // https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
    // https://www.googleapis.com/books/v1/volumes?q=${query}&key=${APIkey}
    return axios.get("/api/googlebooks/" + URLbook)
  }
};
