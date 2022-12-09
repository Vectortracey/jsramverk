import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Toolbar from './Toolbar.js';
import Documents from './Documents.js';
import Auth from './Auth.js';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:1337/";

const socket = socketIOClient(ENDPOINT);


export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
        token: null,
        email: null
    };
  }
  log = () => {
    if (this.editorRef.current) {
      let text = this.editorRef.current.getContent();
      console.log(text);
    }
  };
  empty = () => {
    if (this.editorRef.current) {
      const inputId = document.getElementById('idDoc');
      inputId.value = "";
      const inputName = document.getElementById('nameDoc');
      inputName.value = "";
      this.editorRef.current.setContent("");
    }
  };
  save = (e) => {
      if (e.target[1].value) {
          e.preventDefault();
          fetch(`http://localhost:1337/documents/${e.target[1].value}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': this.state.token
              },
              body: JSON.stringify({
                  id: e.target[1].value,
                  name: e.target[0].value,
                  text: this.editorRef.current.getContent(),
                  owner: this.state.email,
                  allowed_users: [
                    e.target[2].value
                  ]
              })
          });
          alert("Uppdaterad!");
      }
      else {
        console.log(e.target[2].value);
          e.preventDefault();
          fetch('http://localhost:1337/documents', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': this.state.token
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: this.editorRef.current.getContent(),
                  owner: this.state.email,
                  allowed_users: [
                    e.target[2].value,
                  ],
              })
          })
          .then( function (response) {
              alert("Sparat!");
          });
      };
  };
  showText = (docId, name, text) => {
        const inputId = document.getElementById('idDoc');
        inputId.value = docId;
        const inputName = document.getElementById('nameDoc');
        inputName.value = name;
        this.editorRef.current.setContent(text);
        socket.emit("create", docId);
    };
  live = () => {
    socket.on("doc", (data) => {
      this.editorRef.current.setContent(data.html);
    });

    const inputId = document.getElementById('idDoc');
    let data = {
        _id: inputId.value,
        html: this.editorRef.current.getContent()
    };
    socket.emit("doc", data);
  };

  login = (e) => {
    let that = this;
    e.preventDefault();
          fetch('http://localhost:1337/login', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: e.target[0].value,
                  password: e.target[1].value,
              })
          })
          .then( function (response) {
            return response.json();

          }).then(function(data) {
            if (data.errors) {
              if (data.errors.title === "Wrong password") {
                alert("Fel lösenord, försök igen.")
              } else if (data.errors.title === "User not found") {
              alert("Denna användare finns inte. Registrera dig för att logga in.")
              }
            } else if (data.data) {
              that.setState({token: data.data.token, email: data.data.user.email});
            }
          })
  };
  reg = (e) => {
    e.preventDefault();
          fetch('http://localhost:1337/register', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: e.target[0].value,
                  password: e.target[1].value,
              })
          })
          .then( function (response) {
            return response.json();

          }).then(function(data) {
            if (data.errors) {
              if (data.errors.title === "Email or password missing") {
                alert("Mejladress eller lösenord saknas.")
              }
            } else if (data.data.message === "User successfully registered.") {
              alert("Ditt konto är registrerat!")
            }
          })
  };
  render() {
    if (this.state.token == null) {
      return <Auth loginUser={this.login} registerUser={this.reg} />
    }
    return (
      <>
      < Toolbar saveText={this.save} logText={this.log} emptyEditor={this.empty} />
      <p className="currUser">Inloggad användare: { this.state.email }</p>
        <Editor
          id="myTextarea"
          onInit={(evt, editor) => this.editorRef.current = editor}
          onKeyUp={this.live}
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <div className="documents">
        <h3>Välj ett dokument att redigera:</h3>
          < Documents  onTitleClick={this.showText} currToken={this.state.token}/>
        </div>
      </>
    );
  }
}