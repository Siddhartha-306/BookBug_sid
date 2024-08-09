import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Loader from '../../components/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {GrLanguage} from  "react-icons/gr";
import Loader from '../Loader/Loader.jsx';
import { FaEdit, FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';

function viewBookDetails() {

    const { id } = useParams();
    // console.log(id);
    const[data, setData] = useState();
    const[showLoader, setShowLoader] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    console.log(isLoggedIn);
    console.log(role);


    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:4000/api/v1/get-book-by-id/${id}`);
            // console.log(response);
            setData(response.data.data);
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

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    };

    const handleFavourite = async () => {
      const response = await axios.put("http://localhost:4000/api/v1/add-book-to-favourite", {}, { headers });

      alert(response.data.message);
    }

    const handleCart = async () => {
      const response = await axios.put("http://localhost:4000/api/v1/add-to-cart", {}, { headers });

      alert(response.data.message);
    }

    const Navigate = useNavigate();

    const deleteBook = async () => {
      const response = await axios.delete("http://localhost:4000/api/v1/delete-book", {headers});

      // console.log(response);
      alert(response.data.message);
      Navigate("/all-books");
    }

  return (
    <>
      {data && ( (showLoader) ? <div className="flex items-center justify-center mt-[120px]"><Loader /></div>  : 
       <div className='px-12 py-8 flex md:flex-row flex-col  gap-8 items-start '>
        {/* <div className=' rounded p-4 h-[40vh] md:h-[86vh] md:w-3/6 w-full flex items-center justify-around'> */}
        <div className='w-full lg:w-3/5'>
          <div className='flex md:flex-row flex-col justify-around bg-blue-100 p-6 sm:p-12 rounded gap-2'>
            <img src={data.url} alt="book" className='h-[40vh] md:h-[60vh] lg:h-[70vh] rounded' />
           
            {isLoggedIn === true && role === "user" && (
              <div className='flex md:flex-col md:justify-start md:items-center justify-between items-center mt-2 md:mt-0'>
                <button className=' rounded-full text-4xl md:p-2 text-red-500' onClick={handleFavourite}> 
                  <FaHeart />
                </button>
                <button className='rounded-full text-4xl p-2 md:mt-8 text-blue-700' onClick={handleCart}> 
                  <FaShoppingCart /> 
                </button>
              </div>
            )}

            {isLoggedIn === true && role === "admin" && (
              <div className='flex md:flex-col md:justify-start md:items-center justify-between items-center mt-2 md:mt-0'>
                <Link to={`/updateBook/${id}`} className=' rounded-full text-3xl md:p-2 text-red-500'> 
                  <FaEdit />
                </Link>
                <button className='rounded-full text-4xl p-2 md:mt-8 text-blue-700' onClick={deleteBook}> 
                  <MdOutlineDelete /> 
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='p-4 w-full lg:3/5 mb-[-200px]'>
          <h1 className='text-3xl md:text-4xl text-blue-600 font-semibold'>{data.title}</h1> 
          <p className='text-blue-500 mt-1 text-md md:text-lg'>by {data.author}</p>
          <p className='text-black mt-4 text-lg md:text-xl'>{data.description}</p>
          <p className='flex mt-4 items-center justify-start text-zinc-600'><GrLanguage className="me-3" />{data.language}</p>
          <p className='mt-4 text-zinc-800 text-2xl md:text-3xl font-semibold'>Price: ₹ {data.price}{" "}</p>
        </div>
       </div>)
      }
      {
        !data && <div className='mt-[100px] flex items-center justify-center'> <Loader /> </div>
      }
    </>
  );
};

export default viewBookDetails
