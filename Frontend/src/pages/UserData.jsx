import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const UserData = ({userDivData, userDiv, setuserDiv}) => {
  return (
    <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className='bg-blue-200 rounded-md p-4 w-[80%] md:w-[50%] lg:w-[40%] text-black'>
            <div className='flex items-center justify-between'>
                <h1 className='text-blue-800 text-2xl font-semibold'>User Information</h1>
                <button className='text-blue-800 ' onClick={() => setuserDiv("hidden")}>
                    <RxCross1 />
                </button>
            </div>
            <div className='text-blue-700'>
                <div className='mt-2'>
                    <label htmlFor=''>
                        Username :{" "}
                        <span className='font-semibold'>{userDivData.username}</span>
                    </label>
                </div>
                <div className='mt-2'>
                    <label htmlFor=''>
                        Email : {" "}
                        <span className='font-semibold'>{userDivData.email}</span>
                    </label>
                </div>
                <div className='mt-2'>
                    <label htmlFor=''>
                        Address : {" "}
                        <span className='font-semibold'>{userDivData.address}</span>
                    </label>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserData
