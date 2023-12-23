import { configureStore } from '@reduxjs/toolkit'
import ShopReducer from '../Features/ShopSlice'

export default configureStore({
  reducer: {
    ShopStore : ShopReducer,
  }
});