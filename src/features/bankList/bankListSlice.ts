import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface BankListState { 
   bankList : Object
}

export const bankListInit : BankListState = {
   bankList : [],
}

export const bankListAPI = createAsyncThunk('api/bankListStatus', async (userId) => {

    try {
      console.log(`${process.env.NEXT_PUBLIC_URL}`);
      console.log(userId);
        // cors 해결해 주는 사이트로 해결
      //const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth={b5fb67b9107d1fdaada51c9d9cbcf2de}&topFinGrpNo=020000&pageNo=1`);
      // 다른 방법 찾기
      const response = await axios.get(`finlifeapi/companySearch.json?auth=${process.env.NEXT_PUBLIC_CALCULATOR_BANK_API_KEY}&topFinGrpNo=020000&pageNo=1`, {});
      console.log(response);
      console.log(response.data);
      //리턴할때 await 붙여줘야 데이터가 proxy로 안보임
      return await response.data;
    } catch(err) {
        console.log(err);
      return err;
    }
})

 
///ts 는 builder 로 작성
export const bankListSlice = createSlice({
    name : "bankList",
    initialState : {...bankListInit}, 
    reducers : {},
    extraReducers : (builder) => {
      builder
        //호출전
        .addCase(bankListAPI.pending, (state , {payload} ) => {
          console.log(state);
          console.log(payload);
          console.log(bankListInit);
        })
        //호출성공
        .addCase(bankListAPI.fulfilled, (state , action ) => {
            console.log(bankListAPI);
            console.log(state);
            console.log(action.payload.result.baseList);
            // return action.payload;
            // state.bankList.push(action.payload)
            state.bankList = action.payload.result.baseList;
            console.log(current(state));
            // debugger;
        })
        //호출실패
        .addCase(bankListAPI.rejected, (state) => {})
    }
  })
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectBankList = (state: RootState) => state
  
  export default bankListSlice.reducer
  
  
  