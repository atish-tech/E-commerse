import { createSlice } from '@reduxjs/toolkit'

export const TotalShopSlice = createSlice({
  name: 'shop',
  initialState: {
    allProduct: [],
    cartProduct: [],
  },
  reducers: {
    settingAllProduct: (state, payload) => {
      state.allProduct = payload.payload;
    },
    settingCartProduct: (state, payload) => {
      state.cartProduct = payload.payload;
    },
    addCartProductRedux: (state, payload) => {
      state.cartProduct.push(payload.payload);
    },
    removeCartProductRedux: (state, payload) => {
      let arr = [];
      for (let i = 0; i < state.cartProduct.length; i++) {
        if (payload.payload._id != state.cartProduct[i]._id) {
          arr.push(state.cartProduct[i]);
        }
      }
      state.cartProduct = arr;
    },
  }
});


export const { settingAllProduct,
  settingCartProduct,
  addCartProductRedux,
  removeCartProductRedux } = TotalShopSlice.actions;

export default TotalShopSlice.reducer;