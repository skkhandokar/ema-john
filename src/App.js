/* eslint-disable max-lines */
import React, { createContext, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import Header from './componants/Header/Header';
import Shop from './componants/Shop/Shop';
import Review from './componants/Review/Review';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet, // New: Outlet component for nested routes
} from 'react-router-dom';
import Inventory from './componants/Inventory/Inventory';
import Nomatch from './componants/Nomatch/Nomatch';
import ProductDetail from './componants/ProductDetail/ProductDetail';
import Shipment from './componants/Shipment/Shipment';
import Login from './componants/Login/Login';
import PrivateRoute from './componants/PrivateRoute/PrivateRoute';

export const userContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <h1>email: {loggedInUser.email}</h1>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route
            path="/shipment"
            element={
              <PrivateRoute>
                <Shipment />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Shop />} />
          <Route path="/product/:productKey" element={<ProductDetail />} />
          <Route path="*" element={<Nomatch />} />
        </Routes>
      </Router>
    </userContext.Provider>
  );
};

export default App;

