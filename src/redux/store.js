import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import goodSlice from './slices/goodSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    good: goodSlice,
    cart: cartSlice,
    order: orderSlice
  }
})
