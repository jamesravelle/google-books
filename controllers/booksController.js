const db = require("../models");

const axios = require('axios')

const APIkey = process.env.GOOGLE_API_KEY;


// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getGoogleBooks: function(req,res){
    const query = req.params.id
    const modQuery = query.split("xxx");
    const queryString = `https://www.googleapis.com/books/v1/volumes?q=${modQuery[0]}+inauthor:${modQuery[1]}&key=${APIkey}`
    // const queryString = `https://www.googleapis.com/books/v1/volumes?q=Neuromancer+inauthor:Gibson&key=AIzaSyCmAPVY9KRO1YkfPimcIZUolkMEhp7HfME`
    axios.get(queryString)
    .then(data => {
      // console.log(data)
      res.send(data.data)
    })
    .catch(err => console.log(err))
  }
};
