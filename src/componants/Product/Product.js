import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock,key } = props.product;

  
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>

            <div className="">
                <h4 className="product-name"><Link to={"/product/"+key} >{name}</Link> </h4>
                <br />

                <p>
                    <small>by {seller} </small>
                </p>
                <br />
                <p>${price}</p>
                <br />
                <p>only {stock} left in stock - order soon</p>
                <br />
                { props.showAddToCart && 
            //     <button className='main-button' onClick={ ()=> props.handleAddProduct (props.product)}>
            //         <FontAwesomeIcon icon={faShoppingCart}/>
            //          add to card
            //    </button> }
             <Button className='main-button' color="primary" onClick={ ()=> props.handleAddProduct (props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                     add to card</Button>}
              <ThumbUpIcon></ThumbUpIcon>
      

                      
            </div>

        </div>
    );
};

export default Product;
