import React from 'react';

export default function Toolbar({ saveText, logText, emptyEditor }) {
    return (
        <>
        <div className="toolbar">
            <form onSubmit={saveText}>
                <label>Namn på dokument: </label>
                <input type="text" id="nameDoc" />
                <label> Dokumentets ID: </label>
                <input type="text" disabled="disabled" id="idDoc" />
                <label>Lägg till användare som ska få tillgång till texten: </label>
                <input type="email" id="nameDoc" placeholder="example@examle.com" />
                <input className="save" id="saveBtn" type="submit" value="Spara" />
            </form>
            <button className="log" onClick={logText}>Logga</button>
            <button className="log" onClick={emptyEditor}>Ny</button>
        </div>
        </>
    );
}