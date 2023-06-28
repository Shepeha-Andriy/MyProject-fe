import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
  config.headers.lang = window.localStorage.getItem('i18nextLng') || 'en'

  return config
})

export default api
