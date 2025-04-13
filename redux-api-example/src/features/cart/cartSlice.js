import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems,addItems,updateItems,deleteItems } from './cartAPI';

const initialState = {
  items : [],
  status: 'idle',
};

export const fetchItemsAsync = createAsyncThunk(
  'carts/fetchItems',
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);

export const addItemAsync = createAsyncThunk(
  'cart/addItems',
  async (item)=>{
    const {id,title,brand,price,thumbnail} = item;
    const response = await addItems({id,title,brand,price,thumbnail,quantity:1});
    return response.data;
  }
)

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id)=>{
    const response = await deleteItems(id);
    return response.data.id;
  }
)

export const updateItemsAsync = createAsyncThunk(
  'cart/updateItem',
  async ({id,updateItem})=>{
    const response = await updateItems(id,updateItem);
    return response.data;
  }
)

export const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addItemAsync.fulfilled,(state,action)=>{
        state.items.push(action.payload);
        state.status = 'idle';
      })
      .addCase(deleteItemAsync.fulfilled,(state,action)=>{
        const index = state.items.findIndex(item=>item.id===action.payload);
        state.items.splice(index,1);
        state.status = 'ldle';
      })
      .addCase(updateItemsAsync.fulfilled,(state,action)=>{
        const index = state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1,action.payload);
      })
  },
});

export const selectcarts = (state) => state.carts.items;
export default cartSlice.reducer;
