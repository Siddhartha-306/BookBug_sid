import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const Settings = () => {

  const [value, setValue] = useState({address: ""});
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=> {
    const fetch = async () => {
      const response = await axios.get("https://bookbug-sid-backend.onrender.com/api/v1/get-user-information", {headers});
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  }, []);

  const change = (e) => {
    const {name, value} = e.target;
    setValue({...value, [name]: value});
  };

  const submitAddress = async () => {
    const response = await axios.put("https://bookbug-sid-backend.onrender.com/api/v1/update-address", value, {headers});

    // console.log(response);
    alert(response.data.message);
  }

  return (
    <>
      {!profileData && <div className='mt-[300px] flex justify-center items-center'>
          <Loader />
        </div>}
      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-blue-900'>
          <h1 className='text-3xl md:text-5xl font-semibold text-blue-800 text-center mb-8'>
            Settings
          </h1>
          <div className='flex sm:flex-row flex-col gap-12'>
            <div>
              <label htmlFor='' className='font-semibold '>Username</label>
              <p className='p-2 px-4 rounded bg-blue-100 mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div>
              <label htmlFor='' className='font-semibold '>Email</label>
              <p className='p-2 px-4 rounded bg-blue-100 mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor='' className='font-semibold'>Address</label>
              <textarea className='p-2 px-4 rounded bg-blue-100 mt-2 font-semibold' rows="5" placeholder='Address' name='address' value={value.address} onChange={change}/>
            </div>
            <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:scale-105 transition-all duration-200 hover:bg-yellow-400' onClick={submitAddress}>
                Update
              </button>
            </div>
          </div>
      )}
    </>
  )
}

export default Settings
