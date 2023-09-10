
/* eslint-disable max-lines */
import React, {  useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
import { handleFBSignIn, handleGoogleSignIn, handleSignOut, initialiseLoginFramework, newUserSignInWithEmailAndPassword , userSignInWithEmailAndPassword} from './loginManager';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

 initialiseLoginFramework()

  const [user, setUser] = useState({isSignedIn:false,name:"",email:"",photo:"",  password:""});
  const [loggedInUser,setLoggedInUser] =useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  const [passValid, setPassValid] = useState(false);

   const navigate  = useNavigate();
   const location= useLocation();

   let {from} = location.state || {from : {pathname: '/'}};


 const googleHandleSignIn  =()=>{
    handleGoogleSignIn()
    .then (res => {
      setUser(res);
     setLoggedInUser(res);
     navigate (from, { replace: true });
    }
     )
 }

  
 const fbHandleSignIn  =()=>{
  handleFBSignIn()
  .then (res => {
    setUser(res);
   setLoggedInUser(res); 
   navigate (from, { replace: true });
  }
   )
}


const signOut = () => {
    handleSignOut()
    .then ( res => {

      setUser(res);
     setLoggedInUser(res);

    })
 }
 

const handleChange = (e) =>{

       let isFormValid =true;
      

       if (e.target.name === 'email')
       {
          isFormValid= /\S+@\S+\.\S+/.test(e.target.value);
       }

       if (e.target.name === 'password')
        {
        const password = e.target.value;
        const hasNumber = /\d/.test(password);

        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    
        if (password.length >= 6 && hasNumber && hasSpecialChar) {
            isFormValid=true;
           
            setPassValid(true);
        } 
        else {

            isFormValid=false;
            setPassValid(false);
           }
             
          }
    if (isFormValid)
    {
     const newUserInfo ={... user};
     newUserInfo[e.target.name]=e.target.value;
     setUser(newUserInfo);
    }
    
      }

  const handleSubmit = (e) => {

     if (newUser && user.email && user.password)
          {
            newUserSignInWithEmailAndPassword(user.name,user.email,user.password)

            .then (res => {
              setUser(res);
             setLoggedInUser(res);
             navigate (from, { replace: true });
            }
             )
        }

     if (!newUser && user.email && user.password)
         {

          userSignInWithEmailAndPassword(user.email,user.password)

          .then (res => {
            setUser(res);
           setLoggedInUser(res);
           navigate (from, { replace: true });
          }
           )
        }
        e.preventDefault();
        
        }

 

    return (
        <div className="" style={{textAlign:"center"}}>
        {
          user.isSignedIn ?  <button onClick={signOut}> Google Sign Out</button>:
          <button onClick={googleHandleSignIn}>Google Sign In</button>
        }

       {
          user.isSignedIn ?  <button onClick={signOut}> Facebook Sign Out</button>:
          <button onClick={fbHandleSignIn}>Facebook  Sign In</button>
        }
       
        {
          user.isSignedIn &&  <p> welcome, {user.name} </p>
        }

        <br />
        <h1>Our Authentication</h1>
      
      <input type="checkbox" onChange={()=> setNewUser(!newUser) }name="newUser" id="" />
      <label htmlFor="newUser">New User</label>
        
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" onChange={handleChange}  name='name' placeholder='Your Name' id='1' /> }<br /> <br />
         
          <input type="text" onChange={handleChange}  name='email' placeholder='Your Email' id='2' /> <br /> <br />
          <input type="password" onChange={handleChange}  name='password' placeholder='Your Password'   id='3' />
        <FontAwesomeIcon
        icon={faCheckSquare}
        style={{
          backgroundColor: 'white',
          color: passValid ? 'green' : 'red',
        }}
      />
          <br /><br />
          <input type="submit" value={newUser?"Sign Up":"Sign In"} />
      </form>
 
        </div>
    );
};

export default Login;
