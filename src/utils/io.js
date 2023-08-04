import { io } from 'socket.io-client'
import jwtDecode from 'jwt-decode'

export const socket = io('http://localhost:8090')
// export const socket = io('ws:/localhost:8080')

export const initSocket = async () => {
  const token = JSON.parse(localStorage.getItem('profile'))?.token || null
  let decodedToken;

  if (token) {
    decodedToken = jwtDecode(token)
  }

  if (decodedToken.exp >= new Date()) {
    return
  }

  socket.emit('add-user', decodedToken.id)
}
