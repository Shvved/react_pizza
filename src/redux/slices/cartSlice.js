import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const findItem = (state, payload) => {
  return state.items.find(
    (obj) => obj.id === payload.id && obj.type === payload.type && obj.size === payload.size,
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findedItem = findItem(state, action.payload);
      if (findedItem) {
        findedItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    removeItem(state, action) {
      const findedItem = findItem(state, action.payload);

      if (findedItem.count > 1) {
        findedItem.count--;
      } else {
        state.items = state.items.filter((obj) => obj !== findedItem);
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    removeAllItem(state, action) {
      const findedItem = findItem(state, action.payload);
      state.items = state.items.filter((obj) => obj !== findedItem);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeAllItem } = cartSlice.actions;

export default cartSlice.reducer;
