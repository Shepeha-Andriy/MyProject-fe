import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  goods: { goods: [], page: 1, length: null, pages: 1 },
  totalLength: null,
  message: null,
  isLoading: false
}

export const getAllGoods = createAsyncThunk('good/all', async ( params = {}, { rejectWithValue } ) => {
  try {
    let res

    if (params.type && params.page && params.perpage) {
      res = await api.get(`/good/all?type=${params.type}&sort=${params.sort}&page=${params.page}&perpage=${params.perPage}`)
    } else if (params.type) {
      res = await api.get(`/good/all?type=${params.type}&sort=${params.sort}&page=${params.page}&perpage=${params.perPage}`)
    } else {
      res = await api.get(`/good/all?type=&sort=${params.sort}&page=&perpage=`)
    }

    return res.data
  } catch (error) {
    console.log('get all goods slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const getCart = createAsyncThunk('good/cart', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/good/cart?page=${params.page}&userId=${params.userId}`)

    return data
  } catch (error) {
    console.log('get cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})


const goodSlice = createSlice({
  name: 'good',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      //get all
    .addMatcher(
      (action) => action.type === getAllGoods.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === getAllGoods.fulfilled.type,
      (state, action) => {
        state.goods.goods = action.payload.data.goods
        state.goods.length = action.payload.data.length
        state.goods.page = action.payload.data.page
        state.goods.pages = action.payload.data.pages
        state.totalLength = action.payload.data.totalLength
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === getAllGoods.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
       //get cart
    .addMatcher(
      (action) => action.type === getCart.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === getCart.fulfilled.type,
      (state, action) => {
        state.goods.goods = action.payload.data.goods
        state.goods.page = action.payload.data.page
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === getCart.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  }
})

export default goodSlice.reducer
