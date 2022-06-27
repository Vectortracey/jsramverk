import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Toolbar from "./Toolbar";
import io from "socket.io-client";


const ENDPOINT = "http://localhost:1337";


function Editor() {
    const [editorValue, setEditorValue] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');
    const [lastDelta, setLastDelta] = useState({});
    const history = useHistory();
    const socketRef = useRef();
    const quill = useRef(null);

    useEffect(() => {
        const socket = io.connect(ENDPOINT);

        socketRef.current = socket;

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        };
    }, []);

    const { id } = useParams();

    const handleEditorChange = (content, delta) => {
        if (!editorValue) {
            return;
        }
        setEditorValue(content);
        if (JSON.stringify(lastDelta.ops) ===
            JSON.stringify(delta.ops)) {
            return;
        }
        setLastDelta(delta);
        socketRef.current.emit("doc_content", delta);
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;
        const urlToFetch = `${ENDPOINT}/documents/${id}`;

        fetch(urlToFetch, {
            method: 'get',
            signal: signal,
        })
            .then(res => res.json())
            .then(res => {
                setEditorValue(res.content);
                setDocumentTitle(res.title);
            })
            .catch(e => console.log(e));
        socketRef.current.emit("open", id);
        console.log("opened", id);
        socketRef.current.on("doc_content", function (delta) {
            setLastDelta(delta);
            quill.current.getEditor().updateContents(delta);
        });

        return function cleanup() {
            controller.abort();
            socketRef.current.off('doc_content');
        };
    }, [id]);

    function saveDocument() {
        if (id) {
            updateDocument();
            return;
        }
        createDocument();
    }

    function updateDocument() {
        const newContent = quill.current.getEditor().editor.delta;

        if (!documentTitle || !newContent) {
            alert("Can't save a document without a title and/or content!");
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const urlToFetch = `${ENDPOINT}/documents/${id}`;

        fetch(urlToFetch, {
            method: "POST",
            signal: signal,
            body: JSON.stringify({
                title: documentTitle,
                content: newContent,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(() => {
                alert('Document saved');
            })
            .catch(e => console.log(e));
        return function cleanup() {
            controller.abort();
        };
    }

    function createDocument() {
        const newContent = quill.current.getEditor().editor.delta;

        if (!documentTitle || !newContent) {
            alert("Can't create a document without a title and/or content!");
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;
        const urlToFetch = `${ENDPOINT}/documents`;

        fetch(urlToFetch, {
            method: "PUT",
            signal: signal,
            body: JSON.stringify({
                title: documentTitle,
                content: newContent,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then((data) => {
                history.push(`${process.env.PUBLIC_URL}/editor/${data.documentID}`);
                alert('Document saved');
            })
            .catch(e => console.log(e));

        return function cleanup() {
            controller.abort();
        };
    }

    return (
        <>
            <form className="header-form">
                <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="title"
                />
            </form>
            <ReactQuill
                ref={quill}
                theme="snow"
                value={editorValue}
                onChange={handleEditorChange}
                placeholder="content"
            />
            <Toolbar save={saveDocument} />
        </>
    );
}

export default Editor;
