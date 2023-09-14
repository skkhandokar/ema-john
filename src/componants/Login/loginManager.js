/* eslint-disable max-lines */


import * as firebase from 'firebase/app';
import { } from 'firebase/analytics';
import {FacebookAuthProvider, updateProfile, getAuth, getRedirectResult,
    createUserWithEmailAndPassword,signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider,sendEmailVerification,sendPasswordResetEmail  } from "firebase/auth";

import { } from 'firebase/firestore';
import { firebaseConfig } from './firebase.config';



export const initialiseLoginFramework = () =>
{
    firebase.initializeApp(firebaseConfig);
     }


 export const handleGoogleSignIn = ()=>{
    const googleProvider = new GoogleAuthProvider();
        const auth = getAuth();
       return  signInWithPopup(auth, googleProvider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
    
            const user = result.user;
            const {email,displayName, photoURL,password}=user;
    
            const signedInUser ={
              isSignedIn:true,
              name:displayName,
              email:email,
              password:password,
              photo:photoURL
            };
            return signedInUser;
    
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
            // ...
          });
        
          }

// eslint-disable-next-line max-lines

export const handleFBSignIn = ()=>{

            const fbProvider = new FacebookAuthProvider();
            const auth = getAuth();
           return  signInWithPopup(auth, fbProvider)
          .then((result) => {
            // The signed-in user info.
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
        
            const fbUser = result.user;
            const {email,displayName, photoURL,password}=fbUser;
    
            const signedInUser ={
              isSignedIn:true,
              name:displayName,
              email:email,
              password:password,
              photo:photoURL
            };
            return signedInUser;
          
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          
            const email = error.customData.email;
            console.log("error found")
            const credential = FacebookAuthProvider.credentialFromError(error);
            alert(errorMessage)
           
          });
          }


export const handleSignOut = () =>{
        const auth = getAuth();
       return  auth.signOut().then(() => {
        const signedOutUser ={
            isSignedIn:false,
            name:"",
            email:"",
            password:"",
            photo:""
        };
        alert("Succesfully Sign Out");
        return signedOutUser;

        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        alert("Something problem with Sign Out");
        });

    }


export const newUserSignInWithEmailAndPassword = (name,email,password) =>{
        const auth = getAuth();
         
      return createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
          
           const newUser = userCredential.user;
           updateUserName(name);
           alert("New User Created Successfully!");
          //  sendEmailVerificationn(newUser);
          verifyEmail();
           return newUser;
           // ...
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           alert("There is something error create New User");

           });
    }

export const userSignInWithEmailAndPassword =(email,password) =>{
    const auth = getAuth();
    return signInWithEmailAndPassword (auth, email, password)
     .then((userCredential) => {

       const signedUser = userCredential.user;
       
       const {email,displayName, photoURL,password}=signedUser;
       const signedInUser ={
         isSignedIn:true,
         name:displayName,
         email:email
       }
       alert("User logged in Successfully!");
       return signedInUser;

     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert("There is something error user logged in ");
       const signedOutUser ={
        isSignedIn:false,
        name:"",
        email:"",
        password:"",
        photo:""
          };
        return signedOutUser
     });
}

const updateUserName =name =>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name
    }).then(() => {

   }).catch((error) => {

   });
  }

const verifyEmail = ()=>{
const auth = getAuth();
sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

// const sendEmailVerificationn = (user) => {
//   if (user) {
//     sendEmailVerification(user)
//       .then(() => {
//         // Email verification sent!
//         // You can handle this as needed, such as displaying a message to the user.
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert("Error sending email verification: " + errorMessage);
//       });
//   }
// }

 export const resetPassword = email =>{

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}