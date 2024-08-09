import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const [values, setValues] = useState({username: "", email: "", password: "", address: ""});

  const navigate = useNavigate();

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name] : value});
  };

  const submit = async () => {
    try {
      if(values.username === "" || values.email === "" || values.password === "" || values.address === "")
      {
        alert("All fields are required");
      }
      else{
        // console.log(values);
        const response = await axios.post("https://bookbug-sid-backend.onrender.com/api/v1/signUp", values);
        alert(response.data.message);

        navigate("/Login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-[100vh] px-12 py-8 mt-[-28px] flex items-center justify-center'>
      <div className='bg-blue-200 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-blue-800 text-3xl text-center mb-6 font-semibold'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-blue-700 font-semibold text-lg'>
              Username
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-100 text-blue-700 p-2 outline-none rounded' placeholder='Enter your username' name='username' required value = {values.username} onChange={change} />
          </div>
          <div className='mt-4'>  
            <label htmlFor='' className='text-blue-700 font-semibold text-lg'>
              Email
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-100 text-blue-700 p-2 outline-none rounded' placeholder='xyz@example.com' name="email" required value = {values.email} onChange={change} />
          </div>
          <div className='mt-4'>  
            <label htmlFor='' className='text-blue-700 font-semibold text-lg'>
              Password
            </label>
            <input type='password' className='w-full mt-2 bg-zinc-100 text-blue-700 p-2 outline-none rounded' placeholder='Enter the password' name="password" required value = {values.password} onChange={change} />
          </div>
          <div className='mt-4'>  
            <label htmlFor='' className='text-blue-700 text-lg font-semibold'>
              Address
            </label>
            <textarea className='w-full mt-2 bg-zinc-100 p-2 outline-none rounded text-blue-700' rows="5" placeholder='address' name="address" required value = {values.address} onChange={change} />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-200' onClick={submit}>
              SignUp
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-gray-900 font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-gray-900 font-semibold'>Already have an account?  <Link to="/LogIn" className='ml-1 text-blue-600'> Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
