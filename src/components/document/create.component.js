import React, { Component } from "react";
import ReactQuill from 'react-quill';
import DocumentDataService from "../../services/document.service.js";


export default class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContents = this.onChangeContents.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.newDocument = this.newDocument.bind(this);

    this.state = {
      document: {
        id: null,
        name: "",
        contents: "",
      },
      status: {
        submitted: false,
        saved: false,
        messsage: "",
      },
    };
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        document: {
          ...prevState.document,
          name: name,
        },
      };
    });
  }

  onChangeContents(value) {
    const contents = value;
    this.setState((prevState) => ({
      document: {
        ...prevState.document,
        contents: contents,
      },
    }));
  }

  //här
  saveDocument() {
    if (
      this.state.document.name !== "" &&
      this.state.document.contents !== ""
    ) {
      const data = {
        name: this.state.document.name,
        contents: this.state.document.contents,
      };

      //Save document
      DocumentDataService.create(data)
        .then((response) => {
          this.setState({
            document: {
              id: response.data.id,
              name: response.data.name,
              contents: response.data.contents,
            },
            status: {
              submitted: true,
              saved: true,
              message: "Document saved successfully!",
            },
          });
          console.log(response.data);
        })
        .catch((e) => {
          this.setState({
            status: {
              submitted: true,
              saved: false,
              message: "Error encountered while saving document",
            },
          });
          console.log(e);
        });
    } else {
      this.setState({
        status: {
          submitted: true,
          saved: false,
          message:
            "Could not save document because title or contents are empty!",
        },
      });
    }
  }

  newDocument() {
    this.setState({
      document: {
        id: null,
        name: "",
        contents: "",
      },
      status: {
        submitted: false,
        saved: false,
        message: "",
      },
    });
  }

  render() {
    const submitted = this.state.status.submitted;
    const saved = this.state.status.saved;
    const message = this.state.status.message;
    return (
      <div className="editor-form">
        {this.state.saved ? (
          <div>
            <button className="btn btn-success" onClick={this.newDocument}>
              New
            </button>
          </div>
        ) : (
          <div>
            <div>
              {submitted === true && (
                <div>
                  {saved ? (
                    <div class="alert alert-success" role="alert">
                      {message}
                    </div>
                  ) : (
                    <div class="alert alert-danger" role="alert">
                      {message}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="name">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.document.name}
                  onChange={this.onChangeName}
                  name="name"
                  placeholder="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Content</label>
                <ReactQuill
                  value={this.state.document.contents}
                  onChange={this.onChangeContents}
                  placeholder="content"
                />
              </div>

              <button onClick={this.saveDocument} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

