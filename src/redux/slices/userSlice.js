import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  user: JSON.parse(localStorage.getItem('profile'))?.user || null,
  token: JSON.parse(localStorage.getItem('profile'))?.token || null,
  message: '',
  isLoading: false
}

export const userSignUp = createAsyncThunk('/auth/signup', async ({ firstname, lastname, email, password, confirmpassword }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signup', { firstname, lastname, email, password, confirmpassword })

    return data
  } catch (error) {
    console.log('sign up slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const userSignIn = createAsyncThunk('/auth/signin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signin', { email, password })
    console.log('data', data)
    return data
  } catch (error) {
    console.log('sign in slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const userGoogleAuth = createAsyncThunk('/auth/google', async ({ username, email, googleId, token }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/google', { username, email, googleId, token })

    return data
  } catch (error) {
    console.log('google auth slice err', error)
    return rejectWithValue(error.response.data)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('profile')
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      //sign up
    .addMatcher(
      (action) => action.type === userSignUp.pending.type,
      (state) => {
        state.isLoading = true
        state.message = ''
      }
    )
    .addMatcher(
      (action) => action.type === userSignUp.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userSignUp.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  //sign in
    .addMatcher(
      (action) => action.type === userSignIn.pending.type,
      (state) => {
        state.isLoading = true
        state.message = ''
      }
    )
    .addMatcher(
      (action) => action.type === userSignIn.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userSignIn.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  //google auth
    .addMatcher(
      (action) => action.type === userGoogleAuth.pending.type,
      (state) => {
        state.isLoading = true
        state.message = ''
      }
    )
    .addMatcher(
      (action) => action.type === userGoogleAuth.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userGoogleAuth.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
