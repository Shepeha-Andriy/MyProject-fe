import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  message: null,
  isLoading: false
}

export const getMyNotifications = createAsyncThunk('notification/getMy', async ( params = { }, { rejectWithValue } ) => {
  try {

    const { data } = api.get('/notification/getMy')

    return data
  } catch (error) {
    console.log('get my notifications slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const createNotifications = createAsyncThunk('notification/create', async ( params = { }, { rejectWithValue } ) => {
  try {

    const { data } = api.post('/notification/create', params)

    return data
  } catch (error) {
    console.log('get my notifications slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const deleteOneNotifications = createAsyncThunk('notification/deleteOne', async ( params = { }, { rejectWithValue } ) => {
  try {

    const { data } = api.delete('/notification/deleteOne')

    return data
  } catch (error) {
    console.log('get my notifications slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const deleteAllNotifications = createAsyncThunk('notification/deleteAll', async ( params = { }, { rejectWithValue } ) => {
  try {

    const { data } = api.delete('/notification/deleteAll')

    return data
  } catch (error) {
    console.log('get my notifications slice err', error)
    return rejectWithValue(error.response.data)
  }
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      //get my
    .addMatcher(
      (action) => action.type === getMyNotifications.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === getMyNotifications.fulfilled.type,
      (state, action) => {

        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === getMyNotifications.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //create
    .addMatcher(
      (action) => action.type === createNotifications.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === createNotifications.fulfilled.type,
      (state, action) => {

        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === createNotifications.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //delete one
    .addMatcher(
      (action) => action.type === deleteOneNotifications.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === deleteOneNotifications.fulfilled.type,
      (state, action) => {

        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === deleteOneNotifications.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //delete all
    .addMatcher(
      (action) => action.type === deleteAllNotifications.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === deleteAllNotifications.fulfilled.type,
      (state, action) => {

        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === deleteAllNotifications.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  }
})

export default notificationSlice.reducer
