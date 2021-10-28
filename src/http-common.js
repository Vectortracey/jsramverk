import axios from "axios";

export default axios.create({
  baseURL: "https://jsramverk-editor-miek19.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json",
    
  },
});
