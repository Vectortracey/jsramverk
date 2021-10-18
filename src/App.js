import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import "./App.css";

import AddDocument from "./components/add-document.component.js";
import Document from "./components/document.component.js";
import DocumentsList from "./components/document-list.component.js";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/documents" className="navbar-brand">
            Kmom02 react
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/documents"} className="nav-link">
                Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/documents"]} component={DocumentsList} />
            <Route exact path="/add" component={AddDocument} />
            <Route path="/documents/:id" component={Document} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
