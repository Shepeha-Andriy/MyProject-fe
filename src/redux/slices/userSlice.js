import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  isLoading: false
}

export const userSignUp = createAsyncThunk('auth/signup', async ({ firstname, lastname, email, password }) => {
  try {
    const { data } = await api.post('/auth/signup', { firstname, lastname, email, password })

    return data
  } catch (error) {
    console.log('sign up slice err', error)
  }
})

export const userSignIn = createAsyncThunk('auth/signin', async ({ email, password }) => {
  try {
    const { data } = await api.post('/auth/signup', { email, password })
    
    return data
  } catch (error) {
    console.log('sign in slice err', error)
  }
})

export const userGoogleAuth = createAsyncThunk('auth/signin', async ({ username, email, googleId, token }) => {
  try {
    const { data } = await api.post('/auth/signup', { username, email, googleId, token })

    return data
  } catch (error) {
    console.log('sign in slice err', error)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //sign up
    .addMatcher(
      (action) => action.type === userSignUp.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === userSignUp.fulfilled.type,
      (state, action) => {
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userSignUp.rejected.type,
      (state, action) => {
        state.isLoading = false
      }
    )
  //sign in
    .addMatcher(
      (action) => action.type === userSignIn.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === userSignIn.fulfilled.type,
      (state, action) => {
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userSignIn.rejected.type,
      (state, action) => {
        state.isLoading = false
      }
    )
  //google auth
    .addMatcher(
      (action) => action.type === userGoogleAuth.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === userGoogleAuth.fulfilled.type,
      (state, action) => {
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === userGoogleAuth.rejected.type,
      (state, action) => {
        state.isLoading = false
      }
    )
  }
})