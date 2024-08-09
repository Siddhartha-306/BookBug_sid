import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../../store/auth";

const Sidebar = ({ data }) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className=' bg-blue-50 p-4 rounded-md flex flex-col items-center justify-between md:h-screen'>
      <div className='flex items-center justify-center flex-col w-2/5 md:w-full'>
        <img src = {data.avatar} className='h-[12vh]' />
        <p className='mt-3 text-xl text-black font-semibold'>
            {data.username}
        </p>
        <p className='mt-1 text-normal text-black'>
            {data.email}
        </p>
        <div className='w-full mt-4 h-[1px] bg-black hidden lg:block'></div>
      </div>

       {role === "user" && 
       <div className='w-full flex-col items-center justify-center hidden lg:flex'>
       <Link to = "/profile" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
           Favourites
       </Link>
       <Link to = "/profile/orderHistory" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
           Order History
       </Link>
       <Link to = "/profile/settings" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
           Settings
       </Link>      
     </div> }

     {role === "admin" && 
       <div className='w-full flex-col items-center justify-center hidden lg:flex'>
       <Link to = "/profile" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
           All Orders
       </Link>
       <Link to = "/profile/add-book" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
           Add Book
       </Link> 
       </div> }

      <button className='bg-blue-100 w-2/6 md:w-full mt-6 lg:mt-0 text-black font-semibold flex items-center justify-center py-2 rounded hover:bg-blue-400 hover:text-white text-xl transition-all duration-200' onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }}>
        Log Out <FaSignOutAlt className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar
