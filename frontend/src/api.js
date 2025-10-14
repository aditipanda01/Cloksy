import axios from "axios"

const API = axios.create({
  baseURL: "https://prominder.onrender.com/api", // your backend base URL
})

// attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API
