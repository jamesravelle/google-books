import React from "react";

function SearchResult(props) {
    console.log(props.value)
    const buttonClick = (event) => {
        // Pass these attributes back into the parent and add to database
        console.log(event.target.getAttribute("data-title"))
        console.log(event.target.getAttribute("data-author"))
        console.log(event.target.getAttribute("data-synopsis"))
    }
            return (
              // console.log(x)
              <div style={{borderBottom:"1px solid #444444",paddingBottom:"10px",paddingTop:"10px"}}>
                <h3>{props.value.title}</h3>
                <p>By: {props.value.author}</p>
                <p>{props.value.synopsis}</p>
                <button onClick={buttonClick} data-title={props.value.title} data-author={props.value.author} data-synopsis={props.value.synopsis}>Add Book</button>
              </div>
            )
          

    
}

export default SearchResult;
