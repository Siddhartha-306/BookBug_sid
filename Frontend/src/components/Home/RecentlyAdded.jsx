import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loader from '../Loader/Loader.jsx';

function RecentlyAdded() {

    const[data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookbug-sid-backend.onrender.com/api/v1/get-recent-books");

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


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };



  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 mt-16'>
            <div>
                <h1 className='font-bold text-blue-500 text-3xl pb-2'>Discover recently added in the Library</h1>
                <h2 className='font-semibold text-lg mt-2'>Discover a treasure trove of literary gems without spending much effort!</h2>
                <p>Dive into the world of freshly released books that promise to captivate and inspire. Our <b>"Recently Added"</b> section features a handpicked selection of the newest titles across all genres, from gripping thrillers and heartwarming romances to thought-provoking non-fiction and enchanting fantasies. Start your next great read today!</p>
            </div>

            <div className='mt-8'>
                {showLoader ? (<div className='flex justify-center items-center mt-40'><Loader /> </div>) : 
                (<Slider {...settings}>
                      {data && data.map((item, index)=>(
                        <BookCard item = {item} key ={item.id || index} />
                      ))}
                </Slider>)}
            </div>
        </div>
  );
};

export default RecentlyAdded
