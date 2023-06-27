import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  user: JSON.parse(localStorage.getItem('profile'))?.user || null,
  token: JSON.parse(localStorage.getItem('profile'))?.token || null,
  message: null,
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

export const addToCart = createAsyncThunk('good/addToCart', async ({ userId, productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/good/addTocart`, { userId, productId, price })

    return data
  } catch (error) {
    console.log('get cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

export const removeFromCart = createAsyncThunk('good/removeFromCart', async ({ userId, productId, price }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/good/removeFromCart`, { userId, productId, price })
    console.log('data',data)
    return data
  } catch (error) {
    console.log('get cart slice err', error)
    return rejectWithValue(error.response.data)
  }
})

// export const increaseCart = createAsyncThunk('good/increaseCart', async ({ userId, productId, price }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post(`/good/increaseCart`, { userId, productId, price })

//     return data
//   } catch (error) {
//     console.log('get cart slice err', error)
//     return rejectWithValue(error.response.data)
//   }
// })

// export const decreaseCart = createAsyncThunk('good/decreaseCart', async ({ userId, productId, price }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post(`/good/decreaseCart`, { userId, productId, price })

//     return data
//   } catch (error) {
//     console.log('get cart slice err', error)
//     return rejectWithValue(error.response.data)
//   }
// })

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('profile')
      state.user = null
      state.token = null
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
        state.message = null
      }
    )
    .addMatcher(
      (action) => action.type === userSignUp.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.user = action.payload.data.user
        state.token = action.payload.data.token
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
        state.message = null
      }
    )
    .addMatcher(
      (action) => action.type === userSignIn.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.user = action.payload.data.user
        state.token = action.payload.data.token
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
        state.message = null
      }
    )
    .addMatcher(
      (action) => action.type === userGoogleAuth.fulfilled.type,
      (state, action) => {
        localStorage.setItem('profile', JSON.stringify(action.payload.data))
        state.user = action.payload.data.user
        state.token = action.payload.data.token
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
        localStorage.setItem('profile', JSON.stringify({ token: state.token, user: action.payload.data.user }))
        state.user = action.payload.data.user
        state.user.cart.amount = action.payload.data.amount
        state.user.cart.cost = action.payload.data.cost
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
        localStorage.setItem('profile', JSON.stringify({ token: state.token, user: action.payload.data.user }))
        state.user = action.payload.data.user
        state.user.cart.amount = action.payload.data.amount
        state.user.cart.cost = action.payload.data.cost
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
    //increase cart
    // .addMatcher(
    //   (action) => action.type === increaseCart.pending.type,
    //   (state) => {
    //     state.isLoading = true
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type === increaseCart.fulfilled.type,
    //   (state, action) => {
    //     // state.goods.goods = action.payload.data.goods
    //     state.cart.amount = action.payload.data.amount
    //     state.cart.cost = action.payload.data.cost
    //     state.isLoading = false
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type === increaseCart.rejected.type,
    //   (state, action) => {
    //     state.isLoading = false
    //     state.message = action.payload.err
    //   }
    // )
    //   //decrease cart
    // .addMatcher(
    //   (action) => action.type === decreaseCart.pending.type,
    //   (state) => {
    //     state.isLoading = true
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type === decreaseCart.fulfilled.type,
    //   (state, action) => {
    //     // state.goods.goods = action.payload.data.goods
    //     state.cart.amount = action.payload.data.amount
    //     state.cart.cost = action.payload.data.cost
    //     state.isLoading = false
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type === decreaseCart.rejected.type,
    //   (state, action) => {
    //     state.isLoading = false
    //     state.message = action.payload.err
    //   }
    // )
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
