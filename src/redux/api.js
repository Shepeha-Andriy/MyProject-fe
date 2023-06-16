import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('profile').token

  return config
})

export default api
