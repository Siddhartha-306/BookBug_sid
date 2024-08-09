import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const AddBook = () => {
    const [data, setData] = useState({
        url: "", title: "", author: "", price: "", description: "", language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const submit = async () => {
        try {
            if(data.url==="" || data.title==="" || data.author==="" || data.price==="" || data.description==="" || data.language==="")
            {
                alert("All fields are required");
            }
            else{
                const response = await axios.post("https://bookbug-sid-backend.onrender.com/api/v1/add-book", data, { headers });

                setData({
                    url: "", title: "", author: "", price: "", description: "", language: "",
                });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-center text-blue-800 text-3xl md:text-5xl font-semibold mb-8'>
            Add Book
        </h1>
        <div className='p-4 bg-blue-300 rounded'>
            <div>
                <label htmlFor='' className='text-blue-800 font-semibold'>
                    Image
                </label>
                <input type="text" className='w-full mt-2 bg-blue-200 rounded text-blue-800 p-2 outline-none' placeholder=' url of the image' name = "url" required value={data.url} onChange={change} />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-blue-800 font-semibold'>
                    Title of the book
                </label>
                <input type="text" className='w-full mt-2 p-2 bg-blue-200 rounded text-blue-800 outline-none' placeholder = " title of the book" name="title" required value={data.title} onChange={change} />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-blue-800 font-semibold'>
                    Author of book
                </label>
                <input type="text" className='w-full mt-2 bg-blue-200 rounded text-blue-800 p-2 outline-none' placeholder = " author of the book" name="author" required value={data.author} onChange={change} />
            </div>
            <div className='mt-4 flex gap-4'>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-blue-800 font-semibold'>
                        Language
                    </label>
                    <input type="text" className='w-full mt-2 bg-blue-200 p-2 rounded text-blue-800 outline-none' placeholder = " language of the book" name="language" required value={data.language} onChange={change} />
                </div>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-blue-800 font-semibold'>
                        Price
                    </label>
                    <input type="number" className='w-full mt-2 bg-blue-200 p-2 rounded text-blue-800 outline-none' placeholder = " price of the book" name="price" required value={data.price} onChange={change} />
                </div>
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-blue-800 font-semibold'>
                    Description of the book
                </label>
                <textarea rows="5" className='w-full mt-2 bg-blue-200 rounded text-blue-800 p-2 outline-none' placeholder = " description of the book" name="description" required value={data.description} onChange={change} />
            </div>
            <button className='mt-4 px-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-200' onClick={submit}>
                Add Book
            </button>
        </div>
    </div>
  );
};

export default AddBook
