
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateProductService, deleteProductService, getAllProducts, updateProductService } from "../../../services/index";


const initialState = {
  isLoading: false,
  products: [],
};

export const getProducts = createAsyncThunk(
  "/get/products",
  async () => {
    const res = await getAllProducts();
    return res?.data;
  }
);

export const deleteProduct = createAsyncThunk("/delete/product" , async ({id} : any)=>{
      const res = await deleteProductService({id})
      return res
})

export const createproducts = createAsyncThunk("/create/product" , async({formdata} : any)=>{
     const res = await CreateProductService({formdata})
     return res 
})


export const updateproducts = createAsyncThunk("/update/product" , async ({id,formdata } : any)=>{
    const res = await updateProductService({id,formdata})
    return res 
})

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default ProductSlice.reducer;
