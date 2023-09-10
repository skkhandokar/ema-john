/* eslint-disable max-lines */
import React, { useEffect,useState } from 'react';
import fakeProductsData from '../../fakeData/index'; 
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakedb';
import { getStoredCart,clearTheCart,deleteFromDb  } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop =()=> {
 
    const first10=fakeProductsData.slice(0,10);
    const  [products, setProducts] =useState(first10);
    const  [cart, setCart] =useState([]);


    useEffect(()=>{
      const savedCart=  getStoredCart();
      const productKeys = Object.keys(savedCart);

      const cartProducts =productKeys.map(pdkey =>
      {
         const product = fakeProductsData.find(pd => pd.key === pdkey);
         product.quantity= savedCart[pdkey];
         console.log(product);
         return product; }
    );
     setCart(cartProducts);
     
     console.log(cartProducts );
    },[])
  
    const handleAddProduct = (product)=>{
    
      const newCart=[...cart, product];
      setCart(newCart);
      const sameProduct = newCart.filter(pd =>pd.key === product.key);
      const count = sameProduct.length;

      addToDb(product.key);
    }


    return (
        <div  className="shop-container">

        <div className="product-container">              
             
                {products.map(product => 
                 
                  <Product showAddToCart={true} handleAddProduct={handleAddProduct}
                  
                  product={product}></Product>  ) }
        </div>
       
        <div className="cart-container">
          
            <Cart cart={cart}>
              <Link to="/review" >
              <button className="main-button">Review Order</button>
              </Link>
            </Cart>
        
        </div>

        </div>
    );
}

export default Shop;




