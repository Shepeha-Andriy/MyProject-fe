import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import goodSlice from './slices/goodSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    good: goodSlice
  }
})
