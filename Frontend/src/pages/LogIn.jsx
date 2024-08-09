import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

function Login() {

  const [values, setValues] = useState({username: "", password: ""});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name] : value});
  };

  const submit = async () => {
    try {
      if(values.username === "" || values.password === "")
      {
        alert("All fields are required");
      }
      else{
        // console.log(values);
        const response = await axios.post("https://bookbug-sid-backend.onrender.com/api/v1/signIn", values);
        alert("Signed In successfully");
        // console.log(response.data);
        // navigate("/Login");

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
      // console.log(error);
    }
  }

  return (
    <div className='h-[100vh] px-12 py-8 flex items-center justify-center mt-[-44px]'>
      <div className='bg-blue-200 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-blue-800 text-3xl text-center font-semibold'>Login</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-blue-700 text-lg font-semibold'>
              Username
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-100 p-2 text-blue-700 outline-none rounded' placeholder='username' name='username' required value={values.username} onChange={change} />
          </div>
        
          <div className='mt-4'>  
            <label htmlFor='' className=' text-lg text-blue-700 font-semibold'>
              Password
            </label>
            <input type='password' className='w-full mt-2 bg-zinc-100 text-blue-700 p-2 outline-none rounded' placeholder='password' name="password" required value={values.password} onChange={change} />
          </div>
          
          <div className='mt-4'>
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4' onClick={submit}>
              Login
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-gray-900 font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-gray-900 font-semibold'>Don't have an account? <Link to="/SignUp" className='ml-1 text-blue-600'>Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
