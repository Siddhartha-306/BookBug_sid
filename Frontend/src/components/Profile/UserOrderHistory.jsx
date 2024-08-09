import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {

  const [orderHistory, setOrderHistory] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("https://bookbug-sid-backend.onrender.com/api/v1/get-order-history", { headers });

      // console.log(response);
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    // Set a delay of 2ms second
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 200);
  
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Show loader if showLoader is true */}
      {showLoader ? (
        <div className='mt-[300px] flex justify-center items-center'>
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        /* Show empty cart if there are no items in the cart */
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <img src="/src/assets/emptyCart.png" alt="emptyCart" className='h-[20vh]' />
            <h1 className='text-4xl lg:text-5xl font-semibold text-blue-950 ml-8 mt-4'>
              No Order History
            </h1>
          </div>
        </div>
      ) : orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%] mt-4 sm:mt-0 p-0 md:p-4 text-blue-800 '>
          <h1 className='text-3xl text-center md:text-5xl font-semibold text-blue-900 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-blue-300 w-full rounded-t py-2 px-4 pr-5 flex gap-2 font-bold'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>Mode</h1>
            </div>
          </div>
          <div className='border-b border-blue-900'></div>
          {orderHistory.map((items, i) => (
            <div className='font-medium bg-blue-300 w-full py-2 px-4 flex gap-2 hover:bg-blue-400 ' key={i}>
            <div className='w-[3%]'>
              <h1 className='text-center'>{i+1}.</h1>
            </div>
            <div className='w-[22%] text-center'>
              <Link to={`/view-book-details/${items.book && items.book._id}`} className='hover:text-black transition-all duration-200'>
               {items.book && items.book.title}
              </Link>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>{items.book && items.book.description.slice(0, 50)}</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>₹ {items.book && items.book.price}</h1>
            </div>
            <div className='w-[16%] text-center'>
              <h1 className='font-semibold text-green-700'>{items.status === "Order placed" ? (<div className='text-yellow-500'>{items.status}</div>) : items.status === "Cancelled" ? ( <div className='text-red-700'>{items.status}</div>) : (items.status)}
              </h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>COD</h1>
            </div>
          </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory
