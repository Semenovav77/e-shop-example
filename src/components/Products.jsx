import React from 'react';
import {Product} from './../components';

const Products = ({products}) => {
    return (
        <>
            {console.log(products)}
            {products.map((product) => <Product product={product}/>)}
        </>
    );
};

export default Products;