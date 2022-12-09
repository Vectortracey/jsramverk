import React, { useState, useEffect } from "react";

export default function Documents({ currToken, onTitleClick }) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("http://localhost:1337/documents", {
      headers: {
        "x-access-token": currToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (data.length > 0) {
    let allDocs = [];

    for (let i = 0; i < data.length; i++) {
      allDocs.push(
        <div
          className="indDoc"
          onClick={() => onTitleClick(data[i]._id, data[i].name, data[i].text)}
        >
          {data[i].name}
        </div>
      );
    }

    return allDocs;
  }
  return "Skapa ett dokument för att se det här!";
}
