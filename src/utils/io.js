import { io } from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import api from '../redux/api'

export const socket = io('http://localhost:8090')
// export const socket = io('ws:/localhost:8080')

export const initSocket = async () => {
  const token = JSON.parse(localStorage.getItem('profile'))?.token || null
  let decodedToken;

  if (token) {
    decodedToken = jwtDecode(token)
  }

  if(!decodedToken) {
    return
  }

  if (decodedToken.exp >= new Date()) {
    return
  }
  console.log(decodedToken)

  if (decodedToken.id) {
    socket.emit('add-user', decodedToken.id)
  } else {
    const { data } = await api.get(`user/${decodedToken.sub}`)
    console.log(data.data.user._id)
    socket.emit('add-user', data.data.user._id)
  }
}
