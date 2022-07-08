import React, { useState, useEffect } from 'react';

export default function Documents({ onTitleClick }) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("http://localhost:1337/documents")
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    let allDocs = [];

    for (let i = 0; i < data.length; i++) {
        allDocs.push(<div className="indDoc" onClick={() => onTitleClick(data[i]._id, data[i].name, data[i].text)}>{data[i].name}</div>);
    }

    return (
        allDocs
    )
}
