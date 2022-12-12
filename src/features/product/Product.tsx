import React, {useEffect, useState} from 'react';
import { product } from './productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useSelector } from 'react-redux';

import { useMediaQuery } from "react-responsive";

type responsiveProps = {
    children : React.ReactNode
  }

export function Product() {

    const [element, setElement] = useState<HTMLElement | null>(null);
   
    const products = useAppSelector((state) => state.product);

    console.log(products);
    // const Desktop = ({children}:responsiveProps ) => {
    //     const isDesktop = useMediaQuery({minWidth : 992})
    //     return isDesktop ? <>{children}</> : null
    // }

    const isDesktop:boolean = useMediaQuery({ minWidth: 992 })
    const isTablet:boolean = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isMobile:boolean = useMediaQuery({ maxWidth: 767 })
    const isNotMobile:boolean = useMediaQuery({ minWidth: 768 })
    const dispatch = useAppDispatch();

    useEffect(() => {

        
        dispatch(product());



    }, [])

    
    // Hydration failed because the initial UI does not match what was rendered on the server.
    // 에러로 인해 추가
    if (!element) {
        return <></>;
    }

    return (
        <div>
            {/* <Desktop>
                <div>Desktop or laptop</div>
            </Desktop> */}

            {isDesktop && <div>Desktop or laptop</div>}
            {isTablet && <div>Tablet</div>}
            {isMobile && <div>Mobile</div>}
            {isNotMobile && <div>Not mobile (desktop or laptop or tablet)</div>}
        </div>
    );
};
