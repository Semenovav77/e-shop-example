import React from 'react';
import {Product} from './../components';

const Products = ({items, addItem}) => {
    return (
        <>
            {items.map((product) => <Product key={product.id} product={product} addItem={addItem}/>)}
        </>
    );
};

export default Products;