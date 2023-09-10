/* eslint-disable max-lines */
import React from 'react';


const Cart = (props) => {
  
    const cart = props.cart;
   //cart er every element reduce korte hobe.reduce korte gele 2ta jinis pass korte hoy
   // 2nnd peremeter initial value
   // 1st peremeter e 2 ta part thakbe. 1st ta hocche total & 2nd ta hocche element
   
    // const totalPrice= cart.reduce((total, prd ) =>total + prd.price*prd.quantity, 0);
   let totalPrice = cart.reduce((total, prd) => {
        if (prd.quantity) {
          return total + prd.price * prd.quantity;
        } else {
          return total + prd.price;
        }
      }, 0);

     totalPrice = totalPrice.toFixed(2);

    let shipping=0;

    if (totalPrice>200)
    {
        shipping=0;
    }
    else if( totalPrice>100)
    {

        shipping= 8.99;
    }
    else if (totalPrice>0)
    {
        shipping=12.99;
    }

    let tax= (totalPrice/10).toFixed(2);

    let netTotal = (Number(totalPrice) + shipping + Number(tax)).toFixed(2);
 
    return (
        <div>
            <h2>Order Summery</h2>
            <p>Items Ordered: {cart.length}</p><br />
             <p>Product price : {totalPrice}</p><br />
             <p> <small>Tax + VAT : {tax}</small></p><br />
             <p> <small>Shipping : {shipping}  </small></p><br />
             <h3>Net Total Price :{netTotal} </h3>
             <br />
            {props.children}
        </div>
    );
};

export default Cart;