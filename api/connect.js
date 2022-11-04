import axios from "axios";

export default axios.create({
  baseURL: "https://3163-27-72-29-71.ap.ngrok.io",
  headers: {
    "Content-Type": "application/json",
  },
});
