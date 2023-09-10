/* eslint-disable max-lines */

import React, { useEffect, useState } from 'react';
import {getStoredCart,clearTheCart,deleteFromDb  } from '../../utilities/fakedb';
import fakeProductsData from '../../fakeData/index'; 
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useNavigate } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {

 const  [cart , setCart ] =  useState([]);

 const  [orderPlaced , setOrderPlaced ] =  useState(false);

 const navigate = useNavigate();

 const handleProceedCheckout  = () =>
 {
   
    navigate('/shipment')
 }
 // setCart([]);
    // setOrderPlaced(true);
    // clearTheCart();
 const handleRemoveItem = (productkey) =>
 {
    const newCart = cart.filter(pd => pd.key !== productkey);
    setCart(newCart);
    deleteFromDb (productkey);
 }

    useEffect(()=>{
      const savedCart=  getStoredCart();
      const productKeys = Object.keys(savedCart);

      const cartProducts =productKeys.map(pdkey =>
      {
         const product = fakeProductsData.find(pd => pd.key === pdkey);
         product.quantity= savedCart[pdkey];
         return product; }
    );
     setCart(cartProducts);
    },[])

    let thankYou;
    
    if (orderPlaced){
        // eslint-disable-next-line no-undef
        thankYou= <img src={happyImage} alt="" />
    }

    return (
    <div  className="shop-container">
        <div className="product-container">  
         
            {
                cart.map(product => (
                    <ReviewItem key={product.key} handleRemoveItem={handleRemoveItem}   product={product}></ReviewItem>
                ))
            }
            {thankYou}
        </div>

        <div className="cart-container">
                        
                <Cart cart={cart}>
            
                    <Link to="/shop" >
                    <button className="main-button">Continue Shopping</button>
                    </Link>

                    <button onClick={()=>handleProceedCheckout  ()} className="main-button">Proceed Checkout</button>
               
                </Cart>

        </div>
    </div>
    

    );
};

export default Review;