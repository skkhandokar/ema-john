/* eslint-disable max-lines */
import React, {useContext} from 'react';
import { useForm, Controller } from 'react-hook-form';
import "./Shipment.css";
import { userContext } from '../../App';

const Shipment= () =>{

    const [loggedInUser,setLoggedInUser] =useContext(userContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form className='ship-form'  onSubmit={handleSubmit(onSubmit)}>
      
        <input type='text' defaultValue={loggedInUser.name} placeholder='Your Name' {...register("name", { required: true })} />
        {errors.name && <span className='error'>Name is required</span>}

        <input
            type="email"
            placeholder="Your Email"
            defaultValue={loggedInUser.email}
            // {...register("email", {
            //     required: true,
            //     validate: (value) => {
            //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            //     return emailRegex.test(value);
            //     },
            // })}
             />
        {errors.email && <span className="error">Email is not valid</span>}

       <input
        type="text"
        placeholder="Your Address"
        {...register("address", {
            required: true,
            minLength: 10,
            maxLength: 100,
            validate: (value) => {
            const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
            return addressRegex.test(value);
            },
        })}
        />
        {errors.address && <span className='error'>Address is required</span>}  

    <input
        type="text"
        placeholder="Your City"
        {...register("city", {
            required: true,
            minLength: 2,
            maxLength: 50,
            validate: (value) => {
                const cityRegex = /^[a-zA-Z\s-]+$/;
                return cityRegex.test(value);
            },
        })}
    />
    {errors.city && <span className='error'>City is required</span>}

    <input
        type="text"
        placeholder="Your Country"
        {...register("country", {
            required: true,
            minLength: 2,
            maxLength: 50,
            validate: (value) => {
                const countryRegex = /^[a-zA-Z\s-]+$/;
                return countryRegex.test(value);
            },
        })}
    />
    {errors.country && <span className='error'>Country is required</span>}

    <input
        type="text"
        placeholder="Your Postal Code"
        {...register("postalCode", {
            required: true,
            minLength: 5,
            maxLength: 10,
            validate: (value) => {
                // You can define your postal code validation regex here
            const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
                return postalCodeRegex.test(value);
            },
        })}
    />
     {errors.postalCode && <span className='error'>Postal Code is required</span>}


        <input
            type="phoneNumber"
            placeholder="Your Number"
            {...register("phonenumber", {
                required: true,
                minLength: 11,
                maxLength: 14,
                validate: (value) => {
                const phoneRegex = /^\+[0-9]{14}$/;
                return phoneRegex.test(value);
                },
            })}
            /> 
        {errors.phonenumber && <span className='error'>Phone Number is required</span>}             
        
        <input type="submit" />
      </form>
    );
}

export default Shipment;
