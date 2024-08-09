import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

function AllBooks() {

    const[data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookbug-sid-backend.onrender.com/api/v1/get-all-books");

            // console.log(response.data.data);
            setData(response.data.data);
            // console.log(data);
        };

        fetch();
    },[]);


    useEffect(() => {
      // Set a delay of 1 second
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 200);
    
      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }, []);

  return (
    <div>
      {showLoader ? (<div className='flex justify-center items-center mt-64 mb-[-156px]'><Loader /> </div>) : 
        (<div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-10'>
            {data && data.map((item, index)=>(
              <BookCard item = {item} key ={item.id || index} />
            ))}
        </div>)}
    </div>
  )
}

export default AllBooks
