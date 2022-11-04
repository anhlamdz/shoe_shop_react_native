import axios from "axios";

export default axios.create({
  baseURL: "https://44f6-183-80-56-14.ap.ngrok.io",
  headers: {
    "Content-Type": "application/json",
  },
});
