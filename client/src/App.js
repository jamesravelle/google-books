import React from "react";
import Nav from "./components/Nav";

import Books from "../src/pages/Books"
import MyBooks from "../src/pages/MyBooks"
import BookDetails from "../src/pages/BookDetails"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Books />
        </Route>
        <Route path="/mybooks">
          <MyBooks />
        </Route>
        <Route path="/books/:id">
          <BookDetails />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
