import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import "./App.css";

import CreateDocument from "./components/document/create.component.js";
import ViewDocument from "./components/document/view.component.js";
import ListDocument from "./components/document/list.component.js";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/documents" className="navbar-brand">
            Kmom03 react
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
            <Route exact path={["/", "/documents"]} component={ListDocument} />
            <Route exact path="/add" component={CreateDocument} />
            <Route path="/documents/:id" component={ViewDocument} />
          </Switch>
        </div>
      </div>
   </Router>
    );
  }
}

export default App;
