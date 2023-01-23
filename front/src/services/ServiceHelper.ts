import axios from 'axios'

// creates an instance of axios
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    accept: 'application/json'
  }
})
