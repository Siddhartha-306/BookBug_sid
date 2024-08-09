import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../BookCard/BookCard";
import Loader from '../Loader/Loader';

const Favourites = () => {
    const [favouriteBooks, setFavouriteBooks] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:4000/api/v1/get-favourite-books", { headers });

            // console.log(response);
            setFavouriteBooks(response.data.data);
        };

        fetch();
    }, [favouriteBooks]);

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
        {favouriteBooks.length === 0 && ((showLoader) ? (<div className='mt-[300px] flex justify-center'> <Loader /> </div>) :(<div className='font-semibold flex flex-col justify-center items-center text-zinc-500 text-3xl w-full h-[78vh]'>
                <img src='\src\assets\favourite.png' alt='favourite' className='h-[20vh] my-8'/>
                No favourite book available
        </div>))}

        {favouriteBooks.length > 0 && ((showLoader) ? (<div className='mt-[300px] flex justify-center'> <Loader /> </div>) : (favouriteBooks.length > 0 && <div className='sm:mt-0 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-black gap-8 mx-8'>
            { favouriteBooks && favouriteBooks.map((item, index) => (<BookCard item = {item} key ={item.id || index} favourite = {true} />))}
        </div>))}
    </>
  )
}

export default Favourites
