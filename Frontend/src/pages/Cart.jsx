import React from 'react'
import Loader from "../components/Loader/Loader";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://bookbug-sid-backend.onrender.com/api/v1/get-user-cart", { headers });

      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  useEffect(() => {
    // Set a delay of 2ms second
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 200);
  
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`https://bookbug-sid-backend.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, {headers});

    alert(response.data.message);
  };

  useEffect(() => {
    if(cart && cart.length > 0)
    {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      console.log(total);
    }
  }, [cart]);

  const Navigate = useNavigate();

  const placeOrder = async () => {
    try{
      const response = await axios.post("https://bookbug-sid-backend.onrender.com/api/v1/place-order", {order: cart}, { headers });

      alert(response.data.message);
      Navigate("/profile/orderHistory");
    }
    catch(error)
    {
      console.log(error);
    }
  }

  return (
    <>
      {/* Show loader if showLoader is true */}
      {showLoader ? (
        <div className='mt-[300px] flex justify-center items-center'>
          <Loader />
        </div>
      ) : cart.length === 0 ? (
        /* Show empty cart if there are no items in the cart */
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <img src="/src/assets/emptyCart.png" alt="emptyCart" className='h-[20vh]' />
            <h1 className='text-4xl lg:text-5xl font-semibold text-blue-950 ml-8 mt-4'>
              Empty Cart
            </h1>
          </div>
        </div>
      ) : (
        /* Show cart items when the cart has items */
        <>
          <h1 className='text-5xl text-center font-semibold text-blue-800 my-8'>
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-blue-300 justify-between items-center'
              key={i}
            >
              <img
                src={item.url}
                alt="/"
                className='h-[20vh] md:h-[10vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-blue-700 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-blue-800 mt-2 hidden lg:block'>
                  {item.description ? item.description.slice(0, 100) : ''}...
                </p>
                <p className='text-normal text-blue-800 mt-2 hidden md:block lg:hidden'>
                  {item.description ? item.description.slice(0, 65) : ''}...
                </p>
                <p className='text-normal text-blue-800 mt-2 block md:hidden'>
                  {item.description ? item.description.slice(0, 100) : ''}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-blue-700 text-3xl font-semibold flex'>
                  ₹ {item.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border text-xl border-red-700 rounded p-1 ms-12'
                  onClick={() => deleteItem(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 px-8 bg-blue-300 rounded'>
            <h1 className='text-2xl text-blue-800 font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-blue-800'>
              <h2>{cart.length} books</h2>
              <h2>₹ {total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-blue-400 rounded-md px-4 py-2 flex justify-center text-gray-200 w-full font-semibold hover:bg-blue-500' onClick={placeOrder}>
                Place your order
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default Cart
