import React, {useEffect} from 'react';
import { bankList } from './bankListSlice';
import { useAppDispatch } from '../../app/hooks';

export function BankList() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bankList());
    }, [])

    return (
        <div>
            
        </div>
    );
};
