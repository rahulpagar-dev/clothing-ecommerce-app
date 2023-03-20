import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  isAuthenticated: false,
  cartCount:0,
  totalPrice:0
};
export const customReducer = createReducer(initialState, {
  updateProducts: (state, action) => {
    state.products = action.payload;
  },

  updateAuth: (state, action) => {
    state.isAuthenticated = action.payload;
  },
  updateCart: (state, action) =>{
    state.cart = action.payload;
  },
  updateCartCount: (state, action) =>{
    state.cartCount = action.payload;
  },
  updateTotalPrice: (state, action) =>{
    state.totalPrice = action.payload;
  },


});

