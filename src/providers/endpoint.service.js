import axios from 'axios'

let config = { baseURL: "http://localhost:3000/api" }

export const AuthClient = axios.create(config)
