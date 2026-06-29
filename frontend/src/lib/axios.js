import axios from "axios";

//If the environment is in production, use the localhost url else use the /api for production
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL
})

export default api