import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./styles.css";



function App() {

    const [enterdValue, setValue] = useState("");


    const consoleValue = e => {
      e.preventDefault();
      console.log(enterdValue);
    };


    return (
      <div className="App">
        <form onSubmit={consoleValue}>
          <h2>Text Editor!</h2>
          <button
            className="toolbarButton"
            label="Print"
            type="submit">Print</button>


          <ReactQuill
            placeholder="write something."
            value={enterdValue}
            onChange={(e) => setValue(e)}
          />
        </form>
      </div>
    );

}



export default App;
