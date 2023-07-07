import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  goods: null,
  items: null,
  amount: null,
  cost: null,
  page: 1,
  pages: 1,
  message: null,
  isLoading: false
}

export const getCartGoods = createAsyncThunk('cart/cartGoods', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/cart/cartGoods?page=${params.page}`)

    return data
  } catch (error) {
    console.log('get cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const getCart = createAsyncThunk('cart/cart', async ({ userId }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/cart/${userId}`)

    return data
  } catch (error) {
    console.log('get cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/cart/addTocart`, { productId, price })

    return data
  } catch (error) {
    console.log('add to cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/cart/removeFromCart`, { productId, price })
    console.log('data',data)
    return data
  } catch (error) {
    console.log('remove from cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const increaseCart = createAsyncThunk('cart/increaseCart', async ({ productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/cart/increaseCart`, { productId, price })

    return data
  } catch (error) {
    console.log('increase cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const decreaseCart = createAsyncThunk('cart/decreaseCart', async ({ productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/cart/decreaseCart`, { productId, price })

    return data
  } catch (error) {
    console.log('decrease cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get cart goods
    .addMatcher(
      (action) => action.type === getCartGoods.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === getCartGoods.fulfilled.type,
      (state, action) => {
        state.goods = action.payload.data.goods
        state.items = action.payload.data.cart.items
        state.amount = action.payload.data.cart.amount
        state.cost = action.payload.data.cart.cost
        state.page = action.payload.data.page
        state.pages = action.payload.data.pages
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === getCartGoods.rejected.type,
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
        state.items = action.payload.data.items
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
      //add to cart
    .addMatcher(
      (action) => action.type === addToCart.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === addToCart.fulfilled.type,
      (state, action) => {
        state.items = action.payload.data.cart.items
        state.amount = action.payload.data.cart.amount
        state.cost = action.payload.data.cart.cost
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === addToCart.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //remove from cart
    .addMatcher(
      (action) => action.type === removeFromCart.pending.type,
      (state) => {
        state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === removeFromCart.fulfilled.type,
      (state, action) => {
        state.items = action.payload.data.cart.items
        state.amount = action.payload.data.cart.amount
        state.cost = action.payload.data.cart.cost
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === removeFromCart.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
    // increase cart
    .addMatcher(
      (action) => action.type === increaseCart.pending.type,
      (state) => {
        // state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === increaseCart.fulfilled.type,
      (state, action) => {
        state.items = action.payload.data.cart.items
        state.amount = action.payload.data.cart.amount
        state.cost = action.payload.data.cart.cost
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === increaseCart.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
      //decrease cart
    .addMatcher(
      (action) => action.type === decreaseCart.pending.type,
      (state) => {
        // state.isLoading = true
      }
    )
    .addMatcher(
      (action) => action.type === decreaseCart.fulfilled.type,
      (state, action) => {
        state.items = action.payload.data.cart.items
        state.amount = action.payload.data.cart.amount
        state.cost = action.payload.data.cart.cost
        state.isLoading = false
      }
    )
    .addMatcher(
      (action) => action.type === decreaseCart.rejected.type,
      (state, action) => {
        state.isLoading = false
        state.message = action.payload.err
      }
    )
  }
})

export default cartSlice.reducer
