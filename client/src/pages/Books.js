import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import SearchResult from "../components/SearchResult/SearchResult"

import MyBooks from "../pages/MyBooks"

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [googleBooks, setGoogleBooks] = useState([])

  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function handleInputChange(event) {
    const {name, value} = event.target
    // add code to control the components here
    setFormObject({
      ...formObject,
      [name]: value
    })
    console.log(formObject)
  }

  function SearchForBooks(event) {
    event.preventDefault();
    getGoogleBooks(formObject.title, formObject.author);
    
  }

  function deleteBook(id) {
    // add code here to remove a book using API
    API.deleteBook(id)
    .then(res => { 
      console.log(id);
      loadBooks();
    })
    .catch(err => console.log(err));

  }

  function getGoogleBooks(book, author){
    let newArray = [];
    API.getGoogleBooks(book, author)
    .then(res => { 
      // console.log(res.data.items);
      // console.log(res.data.items.length);

      for(let i = 0; i < res.data.items.length; i++){
        let newObject = {};  
          newObject.title = res.data.items[i].volumeInfo.title;
          newObject.author = res.data.items[i].volumeInfo.authors[0];
          newObject.synopsis = res.data.items[i].volumeInfo.description;
          newArray.push(newObject)
      }
      setGoogleBooks(newArray);
      console.log(googleBooks);
    })
    .catch(err => console.log(err));
    
  }

  const addBook = (event) => {
    // Pass these attributes back into the parent and add to database
    console.log(event.target.getAttribute("data-title"))
    console.log(event.target.getAttribute("data-author"))
    console.log(event.target.getAttribute("data-synopsis"))
    const bookObject = {
      title: event.target.getAttribute("data-title"),
      author: event.target.getAttribute("data-author"),
      synopsis: event.target.getAttribute("data-synopsis")
    }
    API.saveBook(bookObject)
    .then(()=>{
      setGoogleBooks([])
    })
    .then(() => 
      loadBooks()
    )
    .catch(err => console.log(err));
}

    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              {/* inputs should be updated to be controlled inputs */}
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={SearchForBooks}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="12">
              {googleBooks.length <= 0 ? <div></div> : <h1>Search Results:</h1>}
              <hr/>
              {googleBooks.map((x)=>{
                console.log(x);
                return <SearchResult value={x} addBook={addBook}/>
              })}
          </Col>
          <Col size="12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <MyBooks />
      </Container>
    );
  }


export default Books;
