
import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity,price,key,img}=props.product;
    const reviewItemStyle =  {
    borderBottom:'1px solid lightgray ',
    padding:'5px',
    marginBottom:'5px',
    marginLeft: '180px',
    marginRight: '380px'
};

    return (
        <div className="product">
        <div className="product-img">
                <img src={img} alt="" />
            </div>
          <div style={reviewItemStyle} className="review-item">
            <h2 className='product-name'>{name}</h2>
            <br />
            <h4> quantity: {quantity}</h4>
            <br />
            <p>Price: {price} </p>
            
            <br />
            <button className='main-button' onClick={ ()=> props.handleRemoveItem (key)}>Remove Item</button>
        </div>
        </div>
    );
};

export default ReviewItem;

