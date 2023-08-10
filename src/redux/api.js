import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
  config.headers.lang = window.localStorage.getItem('i18nextLng') || 'en'

  return config
})

// api.interceptors.response.use((config) => { return config }, async ( error ) => {
//   const originalRequest = error.config

//   try {
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true
//       const response = await api.get('/auth/refresh', { withCredentials: true })
//       localStorage.setItem('profile', JSON.stringify(response.data))
//       return api.request(originalRequest)
//     }
//   } catch (error) {
//     console.log('not authorized')
//   }

//   throw error
// })

export default api
