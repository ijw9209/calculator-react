import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';


interface depositBaseInfoProps {
    dcls_month :string;             //공시 제출 월 [YYYYMM]
    fin_co_no :string;	            //금융회사 코드
    kor_co_nm :string;              //금융회사 명
    fin_prdt_cd :string;            //금융상품코드
    fin_prdt_nm :string;            //금융상품명
    join_way :string;               //가입방법
    mtrt_int :string;               //만기 후 이자율
    spcl_cnd :string;               //우대조건
    join_deny :string;              //가입제한
                                    //Ex) 1:제한없음, 2:서민전용, 3:일부제한
    join_member :string;	        //가입대상
    etc_note:string;                //기타 유의사항
    max_limit:string;               //최고한도
    dcls_strt_day:string;	        //공시 시작일
    dcls_end_day:string;	        //공시 종료일
    fin_co_subm_day:string;         //금융회사 제출일 [YYYYMMDDHH24MI]
}

export interface DepositListState {
    depositList : depositBaseInfoProps[];
}

export const depositListInit : DepositListState = {
    depositList : [],
}

export const depositListAPI = createAsyncThunk('api/depositListStatus', async (userId) => {

    try {
      console.log(`${process.env.NEXT_PUBLIC_URL}`);
      console.log(userId);
        // cors 해결해 주는 사이트로 해결
      //const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth={b5fb67b9107d1fdaada51c9d9cbcf2de}&topFinGrpNo=020000&pageNo=1`);
      // 다른 방법 찾기
      const response = await axios.get(`finlifeapi/savingProductsSearch.json?auth=${process.env.NEXT_PUBLIC_CALCULATOR_BANK_API_KEY}&topFinGrpNo=020000&pageNo=1`, {});
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
export const depositListSlice = createSlice({
    name : "depositList",
    initialState : {...depositListInit}, 
    reducers : {},
    extraReducers : (builder) => {
      builder
        //호출전
        .addCase(depositListAPI.pending, (state , {payload} ) => {
          console.log(state);
          console.log(payload);
          console.log(depositListInit);
        })
        //호출성공
        .addCase(depositListAPI.fulfilled, (state , action ) => {
            console.log(depositListAPI);
            console.log(state);
            console.log(action.payload.result.baseList);
            // return action.payload;
            // state.bankList.push(action.payload)
            state.depositList = action.payload.result.baseList;
            console.log(current(state));
            // debugger;
        })
        //호출실패
        .addCase(depositListAPI.rejected, (state) => {})
    }
  })
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectBankList = (state: RootState) => state
  
  export default depositListSlice.reducer
  