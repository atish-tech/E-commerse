import { configureStore } from '@reduxjs/toolkit'
import ShopReducer from './ShopSlice'

export default configureStore({
  reducer: {
    ShopStore : ShopReducer,
  }
});