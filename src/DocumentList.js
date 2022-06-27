import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from '@heroicons/react/outline';
import DocumentListItem from "./DocumentListItem";

function DocumentList() {
    const [documentList, setDocumentList] = useState([]);

    const ENDPOINT = "http://localhost:1337";

    // get all documents
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const urlToFetch = `${ENDPOINT}/documents`;

        fetch(urlToFetch, {
            method: 'get',
            signal: signal,
        })
            .then(res => res.json())
            .then(res => setDocumentList(res))
            .catch(e => console.log(e));
        return function cleanup() {
            // cancel fetch
            controller.abort();
        };
    }, []);

    return (
        <div className="DocumentList">
            <h3>Documents</h3>
            <ul>
                {documentList.map((document, index) =>
                    <DocumentListItem key={index} document={document} />
                )}
            </ul>
            <Link to={`${process.env.PUBLIC_URL}/editor`}>
                <button className="newButton">
                    <PlusIcon />
					Create New Document
                </button>
            </Link>
        </div>
    );
}

export default DocumentList;
