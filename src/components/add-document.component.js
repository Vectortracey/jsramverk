import React, { Component } from "react";
import ReactQuill from 'react-quill';
import DocumentDataService from "../services/document.service.js";

export default class AddDocument extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContents = this.onChangeContents.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.newDocument = this.newDocument.bind(this);

    this.state = {
      id: null,
      name: "",
      contents:"",
      saved: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeContents(value) {
    this.setState({
      contents: value,
    });
  }

  saveDocument() {
    var data = {
      name: this.state.name,
      contents: this.state.contents,
    };

    DocumentDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          contents: response.data.contents,
          saved: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newDocument() {
    this.setState({
      id: null,
      name: "",
      contents: "",
      saved: false,
    });
  }

  render() {
    return (
      <div className="editor-form">
        {this.state.saved ? (
          <div>
            <h4>Document saved successfully!</h4>
            <button className="btn btn-success" onClick={this.newDocument}>
              New
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Content</label>
              <ReactQuill
                value={this.state.contents}
                onChange={this.onChangeContents}
              />
            </div>

            <button onClick={this.saveDocument} className="btn btn-success">
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}

