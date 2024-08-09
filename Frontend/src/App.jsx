import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import AllBooks from './pages/AllBooks';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ViewBookDetails from './components/viewBookDetails/ViewBookDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth.js';
import Favourites from './components/Profile/Favourites.jsx';
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx';
import Settings from './components/Profile/Settings.jsx';
import AllOrders from './pages/AllOrders.jsx';
import AddBook from './pages/AddBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';

function App() {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role"))
    {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path = "/" element = {<Home />} />
          <Route path = "/all-books" element = {<AllBooks />} />
          <Route path = "/cart" element = {<Cart />} />
          <Route path="/profile" element={<Profile />}>
           
           {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}

           {role === "admin" && (<Route path = "/profile/add-book" element={<AddBook />} />)}
           <Route path = "/profile/orderHistory" element={<UserOrderHistory />} />
           <Route path = "/profile/Settings" element={<Settings />} /> 
        </Route>
          <Route path = "/LogIn" element = {<LogIn />} />
          <Route path = "/updateBook/:id" element = {<UpdateBook />} />
          <Route path = "/SignUp" element = {<SignUp />} />
          <Route path = "/view-book-details/:id" element = {<ViewBookDetails />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
