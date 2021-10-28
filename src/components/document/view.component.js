import React, { Component } from "react";
import ReactQuill from 'react-quill';
import DocumentDataService from "../../services/document.service";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContents = this.onChangeContents.bind(this);
    this.getDocument = this.getDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);

    this.state = {
      currentDocument: {
        id: null,
        name: "",
        contents: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getDocument(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDocument: {
          ...prevState.currentDocument,
          name: name,
        },
      };
    });
  }

  onChangeContents(value) {
    const contents = value;
    this.setState((prevState) => ({
      currentDocument: {
        ...prevState.currentDocument,
        contents: contents,
      },
    }));
  }

  getDocument(id) {
    DocumentDataService.get(id)
      .then((response) => {
        this.setState({
          currentDocument: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateDocument() {
    DocumentDataService.update(
      this.state.currentDocument.id,
      this.state.currentDocument
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Document was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDocument() {
    DocumentDataService.delete(this.state.currentDocument.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/documents");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentDocument } = this.state;

    return (
      <div>
        {currentDocument ? (
          <div className="editor-form-form">
            <h4>Document</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentDocument.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">

                <ReactQuill
                  value={currentDocument.contents}
                  onChange={this.onChangeContents}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDocument}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDocument}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Document...</p>
          </div>
        )}
      </div>
    );
  }
}
