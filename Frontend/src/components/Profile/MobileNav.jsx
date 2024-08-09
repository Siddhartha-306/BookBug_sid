import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MobileNav = () => {

  const role = useSelector((state) => state.auth.role);

  return (
    <>
        {role === "user" && 
        <div className='sm:hidden w-full flex items-center justify-between'>
        <Link to = "/profile" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
              Favourites
          </Link>
          <Link to = "/profile/orderHistory" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
              Order History
          </Link>
          <Link to = "/profile/settings" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
              Settings
          </Link>      
      </div>}

      {role === "admin" && 
      <div className='sm:hidden w-full flex items-center justify-between'>
      <Link to = "/profile" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
            All Orders
        </Link>
        <Link to = "/profile/add-book" className='text-black font-semibold w-full py-2 mt-4 text-center hover:bg-blue-300 rounded transition-all text-xl'>
            Add Book
        </Link>     
    </div>}
    </>
  )
}

export default MobileNav
