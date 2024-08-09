import React from 'react';
import banner from "../../assets/banner.png";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col-reverse md:pr-4 md:flex-row items-center justify-center md:mt-2 lg:mt-[-100px] mt-[-52px]'>
            <div className='w-full md:w-1/2'>
                <div className='space-y-12 mt-12 md:mt-32'>
                    <h1 className='text-4xl font-bold'>Catch the Reading Bug at <span className='text-blue-500'>BookBug!</span></h1>

                    <p className='text-xl'>Dive into our curated selection of bestsellers, new releases, and hidden gems across all genres. From gripping mysteries and heartwarming romances to insightful non-fiction and enchanting fantasies, there's a book for every reader at BookBug.</p>

                    <div className='border w-[200px] px-4 py-2 bg-blue-500 rounded-md text-center text-lg font-bold text-white hover:scale-105 transition-all duration-200 hover:bg-blue-700'>
                        <Link to="/all-books" >Discover Books</Link>
                    </div>
                </div>
            </div>
            
            <div className='w-full md:w-1/2 mt-12 md:mt-32'>
                <img src={banner} alt='main_image' />
            </div>
        </div>
    </>
  )
}
export default Hero
