import React from "react";

function SearchResult(props) {
            return (
              // console.log(x)
              <div style={{borderBottom:"1px solid #444444", paddingBottom:"10px", paddingTop:"10px"}}>
                <h3>{props.value.title}</h3>
                <p>By: {props.value.author}</p>
                <p>{props.value.synopsis}</p>
                <button onClick={props.addBook} data-title={props.value.title} data-author={props.value.author} data-synopsis={props.value.synopsis}>Add Book</button>
              </div>
            )
          

    
}

export default SearchResult;
