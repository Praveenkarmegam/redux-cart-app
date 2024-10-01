import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
    products: [
      {
        id: 1,
        title: "iPhone 9",
        price: 549,
        quantity: 1,
        totalAmount: 549,
        stock: 94,
      },
      {
        id: 2,
        title: "iPhone X",
        price: 899,
        quantity: 1,
        totalAmount: 899,
        stock: 34,
      },
      {
        id: 3,
        title: "Samsung Universe 9",
        price: 1249,
        quantity: 1,
        totalAmount: 1249,
        stock: 36,
      },
      {
        id: 4,
        title: "OPPOF19",
        price: 280,
        quantity: 1,
        totalAmount: 280,
        stock: 123,
      },
      {
        id: 5,
        title: "Huawei P30",
        price: 499,
        quantity: 1,
        totalAmount: 499,
        stock: 32,
      },
    ],
    totalQuantity: 5,
    totalPrice: 5475,
  };
  

// Redux slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload);
      if (product && product.stock > product.quantity) {
        product.quantity += 1;
        product.totalAmount = product.price * product.quantity;
        state.totalQuantity += 1;
        state.totalPrice += product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.totalAmount = product.price * product.quantity;
        state.totalQuantity -= 1;
        state.totalPrice -= product.price;
      }
    },
    removeItem: (state, action) => {
      const productIndex = state.products.findIndex(item => item.id === action.payload);
      if (productIndex > -1) {
        state.totalQuantity -= state.products[productIndex].quantity;
        state.totalPrice -= state.products[productIndex].totalAmount;
        state.products.splice(productIndex, 1);

        // Reset totals if no items are left in the cart
        if (state.products.length === 0) {
          state.totalQuantity = 0;
          state.totalPrice = 0;
        }
      }
    }
  }
});

export const { increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  }
});