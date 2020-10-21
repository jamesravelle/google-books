import React from "react";
import style from "./style.css"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <a href="/" className="menu-link">Search</a>
      <a href="/mybooks" className="menu-link">View Your Collection</a>
    </nav>
  );
}

export default Nav;
