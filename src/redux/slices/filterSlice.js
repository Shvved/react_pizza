import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.activeCategory = action.payload;
    },
    setSelectedSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
			state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
    },
  },
});

export const { setCategoryId, setSelectedSortType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
