import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define a type for the slice state
export interface ProductState {
    data: []
}

export const productApi = createApi({
    reducerPath : 'productApi',
    baseQuery : fetchBaseQuery({ baseUrl : 'http://finlife.fss.or.kr/finlifeapi/'}),
    tagTypes: [],
    endpoints: (builder) => ({
      getProductByName: builder.query({
        // query: (name: string) => `pokemon/${name}`,
        query: (name: string) => `/savingProductsSearch.json?auth=b5fb67b9107d1fdaada51c9d9cbcf2de&topFinGrpNo=020000&pageNo=1`,
      }),
    }),
})

export const  { useGetProductByNameQuery } = productApi;