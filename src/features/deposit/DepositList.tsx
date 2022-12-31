import React, {useEffect , useState} from 'react';
import { depositListAPI } from './depositListSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


export function DepositList() {

    const dispatch = useAppDispatch();
    const depositLists = useAppSelector((state) => state.depositList);
    console.log(depositLists);
    useEffect(() => {
        dispatch(depositListAPI());
    }, []);

    return (
        <>
        {/* <div>예적금 리스트</div> */}
            <>
            {depositLists.depositList.map((item:any,index:number) => (
                <b key={index}>{item.fin_prdt_nm}</b>
            ))}
            </>
        </>
    )

}