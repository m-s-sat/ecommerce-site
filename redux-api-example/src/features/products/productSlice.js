import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './productAPI';

const initialState = {
  products : [],
  status: 'idle',
};

export const fetchProductAsync = createAsyncThunk(
  'products/fetchproduct',
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const { } = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export default productSlice.reducer;
