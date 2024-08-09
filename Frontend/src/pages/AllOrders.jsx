import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import {FaUserLarge} from "react-icons/fa6";
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import UserData from './UserData';

const AllOrders = () => {

   const [allOrders, setAllOrders] = useState();
   const [options, setOptions] = useState(-1);
   const [value, setValues] = useState({status: ""});
   const [userDiv, setuserDiv] = useState("hidden");
   const [userDivData, setuserDivData] = useState(); 

   const  headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:4000/api/v1/get-all-orders", {headers});

            console.log(response);
            setAllOrders(response.data.data);
        };
        fetch();
    }, [allOrders]);


    const change = (e) => {
        const {value} = e.target;
        setValues({status: value});
    };

    const submitChanges = async (i) => {
        const id = allOrders[i]._id;
        const response = await axios.put(`http://localhost:4000/api/v1/update-status/${id}`, value, {headers});
        console.log(response); 
        alert(response.data.message);
    };

    // const setOptionsButton = (i) => {
    //     setOptions(i);
    // }
    // allOrders && allOrders.splice(allOrders.length - 1, 1);
  return (
    <>
        {!allOrders && (<div className='h-[100%] flex items-center justify-center'><Loader /></div>)}

        {allOrders && allOrders.length > 0 && (
        <div className='h-[100%] mt-4 sm:mt-0 p-0 md:p-4 text-blue-800 '>
        <h1 className='text-3xl text-center md:text-5xl font-semibold text-blue-900 mb-8'>
            All Orders
        </h1>
        <div className='mt-4 bg-blue-300 w-full rounded-t py-2 px-4 pr-5 flex gap-2 font-bold'>
            <div className='w-[3%]'>
                <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
                <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
                <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
                <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
                <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%] mt-[5px]'>
                <h1 className=''><FaUserLarge /></h1>
            </div>
        </div>
        <div className='border-b border-blue-900'></div>

        {allOrders.map((items, i) => (
            <div key={i} className='bg-blue-300 w-full py-2 px-4 flex gap-2 hover:bg-blue-400 font-medium transition-all duration-200'>
                <div className='w-[3%]'>
                    <h1 className='text-center'>{i+1}.</h1>
                </div> 
                <div className='w-[40%] md:w-[22%] text-center'>
                    {items.book && (
                        <Link to={`/view-book-details/${items.book._id}`} className="hover:text-black">
                            {items.book.title}
                        </Link>
                    )}
                 </div>
                <div className='w-0 md:w-[45%] hidden md:block'>
                    <h1 className='text-center'>{items.book?.description.slice(0,50)}...</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                    <h1 className='text-center'>{items.book?.price}</h1>
                </div>
                <div className='w-[30%] md:w-[16%]'>
                    <h1 className='font-semibold text-center'>
                        <button className='hover:scale-105 transition-all duration-200' onClick={()=>setOptions(i)}>
                            {items.status === "Order placed" ? (
                                <div className='text-yellow-700'>{items.status}</div>) : items.status === "Cancelled" ? (
                                    <div className='text-red-700'>{items.status}</div>
                                ): (<div className='text-green-700'>{items.status}</div>)}
                        </button>
                        <div className={`${options === i ? "block" : "hidden"} flex mt-4`}>
                            <select name='status' id='' className='bg-blue-200 rounded cursor-pointer ml-[-16px]' onChange={change} value={value.status}>
                                {[
                                    "Order Placed",
                                    "Out for delivery",
                                    "Delivered",
                                    "Cancelled",
                                ].map((items, i) => (
                                    <option value={items} key={i}>
                                      {items}
                                    </option>
                                ))}
                            </select>
                            <button className='text-green-700 hover:textpink-600 mx-2' onClick={() => {
                                setOptions(-1);
                                submitChanges(i);
                            }}>
                                <FaCheck />
                            </button>
                        </div>
                    </h1>
                </div>
                <div className='w-[10%] md:w-[5%]'>
                    <button className='text-xl hover:text-orangr-500' onClick={()=>{setuserDiv("fixed");
                     setuserDivData(items.user);
                    }}>
                        <IoOpenOutline />
                    </button>
                </div>
            </div>
        ))}
        </div>)}

        {userDivData && <UserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />}
    </>
  );
};

export default AllOrders;
