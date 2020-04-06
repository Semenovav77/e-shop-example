import React, {useCallback, useEffect, useState} from 'react';
import {Product} from './../components';
import throttle from 'lodash/throttle';

const Products = ({items, addItem}) => {
    const handleScroll = throttle(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log(windowHeight+' '+documentHeight+' '+scrollTop);
        if (windowHeight + scrollTop + 1 >= documentHeight) {
            setCountItem(countItem + 4)
        }
    },600) ;

    const [countItem, setCountItem] = useState(12);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[handleScroll]);

    useEffect(() => {
       if (countItem === items.length)  window.removeEventListener('scroll', handleScroll);
    },[countItem]);

    return (
        <>
            {items.slice(0,countItem).map((product) => <Product key={product.id} product={product} addItem={addItem}/>)}
        </>
    );
};

export default Products;