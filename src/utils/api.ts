import axios from "axios";

const api = axios.create({
  baseURL: "https://chatgpt-42.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
    "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

export default api;
