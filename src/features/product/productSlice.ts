import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// axios.defaults.baseURL = "http://finlife.fss.or.kr/";
// axios.defaults.withCredentials = true;

// Define a type for the slice state
export interface ProductState {
  product: Object
}

export interface BankListState { 
  bankList : Object
}

const initialState : ProductState = {
  product : {},
}

const bankInitState : BankListState = {
  bankList : {},
}




//b5fb67b9107d1fdaada51c9d9cbcf2de
export const product = createAsyncThunk('api/productStatus', async (userId) => {

    try {
      console.log(`${process.env.NEXT_PUBLIC_URL}`);
      console.log(userId);
        // cors 해결해 주는 사이트로 해결
    //   const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth={b5fb67b9107d1fdaada51c9d9cbcf2de}&topFinGrpNo=020000&pageNo=1`);
      // 다른 방법 찾기
      const response = await axios.get(`finlifeapi/savingProductsSearch.json?auth=${process.env.NEXT_PUBLIC_CALCULATOR_BANK_API_KEY}&topFinGrpNo=020000&pageNo=1`, {});
      console.log(response);
      return response.data;
    } catch(err) {
        console.log(err);
      return err;
    }
 })


 ///ts 는 builder 로 작성
 export const productSlice = createSlice({
  name : "product",
  initialState, 
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(product.pending, (state , {payload} ) => {
        console.log(state);
        console.log(payload);
      })
      .addCase(product.fulfilled, (state , action ) => {
          console.log(state);
          console.log(action.payload);
          return action.payload;
          // state.product.push(action.payload)
      })
      .addCase(product.rejected, (state) => {})
  }
})

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state

export default productSlice.reducer


