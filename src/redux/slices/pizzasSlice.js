import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { currentPage, sortBy, category, search, visibleItemsCount } = params;
  const { data } = await axios.get(
    `https://630f3863498924524a886aa0.mockapi.io/items?page=${currentPage}&limit=${visibleItemsCount}&${category}&sortBy=${sortBy}&order=desc${search}`,
  );
  return data;
});
const initialState = {
  items: [],
  pageCount: 0,
  status: 'loading', //loading, success, error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.pageCount = Math.round(action.payload.count / 8);
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems, setPageCount } = pizzasSlice.actions;

export default pizzasSlice.reducer;
