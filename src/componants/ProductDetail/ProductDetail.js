import React from 'react';
import { useParams } from "react-router-dom";
import fakeProductsData from '../../fakeData/index'; 
import Product from '../Product/Product';
const ProductDetail = () => {
  
    const { productKey} = useParams();
    const product= fakeProductsData.find(pd => pd.key === productKey)
    return (
        <div>
            <h2>Your Product detail </h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;