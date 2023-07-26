import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  orders: null,
  totalLength: null,
  message: null,
  isLoading: false
}

export const createOrder = createAsyncThunk('order/create', async ( { description, price}, { rejectWithValue } ) => {
  try {
    const { data } = await api.post('/order/create', {
        product: {
          description,
          price
        }
      }
    )

    return data
  } catch (error) {
    console.log('create order slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const captureOrder = createAsyncThunk('order/capture', async ({ orderID }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/order/capture', {
        orderID
      })

    return data
  } catch (error) {
    console.log('capture order slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const faildeOrder = createAsyncThunk('order/failded', async ({ orderID }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/order/failded', {
        orderID
      })

    return data
  } catch (error) {
    console.log('fail order slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const cancelOrder = createAsyncThunk('order/cancel', async ({ orderID }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/order/cancel', {
        orderID
      })

    return data
  } catch (error) {
    console.log('cancel order slice err', error)
    return rejectWithValue(error.response.data)
  }
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      //create
    .addMatcher(
      (action) => action.type === createOrder.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === createOrder.fulfilled.type,
      (state, action) => {
        
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === createOrder.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //capture
    .addMatcher(
      (action) => action.type === captureOrder.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.fulfilled.type,
      (state, action) => {
        
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //fail
    .addMatcher(
      (action) => action.type === captureOrder.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.fulfilled.type,
      (state, action) => {
        
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //cancel
    .addMatcher(
      (action) => action.type === captureOrder.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.fulfilled.type,
      (state, action) => {
        
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === captureOrder.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  }
})

export default orderSlice.reducer
