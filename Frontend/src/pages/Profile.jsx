import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

function Profile() {

  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }; 

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/api/v1/get-user-information", {headers});

      setProfile(response.data);
    }

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

  const [sticky, setSticky] = useState(false);

    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY > 0)
            {
                setSticky(true);
            }
            else{
                setSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

  return (
    <div className='px-2 md:px-12 flex flex-col md:flex-row h-[100vh] py-8 md:gap-4 gap-8 text-white'>
     
      {!profile && <div className='mt-[300px] ml-[780px] flex justify-center'> <Loader /> </div>}
      
      {profile && (showLoader) ? <div className='mt-[300px] ml-[780px] flex justify-center'> <Loader /> </div> : (
        <>
          <div className={`md:fixed md:top-0 md:left-0 md:w-1/4 md:h-full w-full h-[30%]`}>
            <Sidebar data = {profile} />
          </div>
          <div className='sm:hidden mt-8'>
            <MobileNav />
          </div>
          <div className='md:ml-[26%] md:w-3/4 md:h-[92vh] w-full'>
            <Outlet />
          </div>
        </>)}
    </div>
  )
}

export default Profile
