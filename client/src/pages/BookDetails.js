import React, {useEffect, useState} from "react";

import { useParams } from 'react-router-dom';

import API from "../utils/API"

function BookDetails() {
  const [books, setBooks] = useState({})

  let { id } = useParams();

  const getBookInfo = () => {
    API.getBook(id)
    .then(res => { 
        setBooks(res.data)
      })
      .catch(err => console.log(err));
  }


  useEffect(() => {
    getBookInfo();    
  }, [])


  return (
    <div className="container" style={{margin:"20px", padding:"20px"}}>
            <h1 style={{marginBottom:"20px"}}>{books.title}</h1>
            <p>Author: {books.author}</p>
            <hr />
            <p>{books.synopsis}</p>
    </div>
  );
}

export default BookDetails;
