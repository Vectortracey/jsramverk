import React, { Component } from "react";
import DocumentDataService from "../services/document.service.js";
import { Link } from "react-router-dom";

export default class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDocuments = this.retrieveDocuments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDocument = this.setActiveDocument.bind(this);
    this.removeAllDocuments = this.removeAllDocuments.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      documents: [],
      currentDocument: null,
      currentIndex: -1,
      currentPreview: "",
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveDocuments();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveDocuments() {
    DocumentDataService.getAll()
      .then((response) => {
        this.setState({
          documents: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDocuments();
    this.setState({
      currentDOcument: null,
      currentIndex: -1,
    });
  }

  setActiveDocument(document, index) {
    let preview = document.contents.replace(/(<([^>]+)>)/gi, "");
    this.setState({
      currentDocument: document,
      currentIndex: index,
      currentPreview: preview,
    });
  }

  removeAllDocuments() {
    DocumentDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    DocumentDataService.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          documents: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, documents, currentDocument, currentIndex } =
      this.state;

    return (
      <div className="list row">
      {/*
      # search document by id, not in use

        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        */}
        <div className="col-md-6">
          <h4>Document List</h4>

          <ul className="list-group">
            {documents &&
              documents.map((document, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDocument(document, index)}
                  key={index}
                >
                  {document.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDocuments}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDocument ? (
            <div>
              <h4>Document</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDocument.name}
              </div>
              <div>
                <label>
                  <strong>Contents:</strong>
                </label>{" "}
                {this.state.currentPreview}
              </div>
              <Link
                to={"/documents/" + currentDocument.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Document...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
