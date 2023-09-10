

/* eslint-disable max-lines */
// import React, { useContext } from "react";
// import { Route,  Navigate } from "react-router-dom";
// import { userContext } from "../../App";



// const PrivateRoute = ({ children, ...rest }) => {
//   const [loggedInUser, setLoggedInUser] = useContext(userContext);


//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         loggedInUser.email ? (children) : (
//           <Navigate to={{ pathname: "/login", state: { from: location } }} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;


import React, { useContext } from "react";
import {  BrowserRouter as Router,
  Routes,
 
 Route, Navigate,useLocation } from "react-router-dom";
import { userContext } from "../../App";




const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const location = useLocation();

  // Now you can access the current route path from location.pathname
  const currentPath = location.pathname;

  if (!loggedInUser.email) {

    return <Navigate to="/login" replace state={{ from: currentPath}} />;
  }

  return children;

  // return (
  //   <Router>
  //   <Routes>
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //       loggedInUser.email ? (children) : (
  //         <Navigate to={{ pathname: "/login", state: { from: location } }} />
  //       )
  //     }
  //   />
  //   </Routes>
  //   </Router>
  // );

};

export default PrivateRoute;