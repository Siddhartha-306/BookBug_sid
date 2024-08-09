import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {

    const [data, setData] = useState({
        url: "", title: "", author: "", price: "", description: "", language: "",
    });
    
    const {id} = useParams();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
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
                const response = await axios.put("https://bookbug-sid-backend.onrender.com/api/v1/update-book", data, { headers });

                setData({
                    url: "", title: "", author: "", price: "", description: "", language: "",
                });
                alert(response.data.message);
                navigate(`/view-book-details/${id}`);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`https://bookbug-sid-backend.onrender.com/api/v1/get-book-by-id/${id}`);
            // console.log(response);
            setData(response.data.data);
        };
        fetch();
    }, []);

    const navigate = useNavigate();

  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Update Book
        </h1>
        <div className='p-4 bg-zinc-800 rounded'>
            <div>
                <label htmlFor='' className='text-zinc-400'>
                    Image
                </label>
                <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='url of the image' name = "url" required value={data.url} onChange={change} />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Title of the book
                </label>
                <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 outline-none' placeholder = "title of the book" name="title" required value={data.title} onChange={change} />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Author of book
                </label>
                <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 outline-none' placeholder = "author of book" name="author" required value={data.author} onChange={change} />
            </div>
            <div className='mt-4 flex gap-4'>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-zinc-400'>
                        Language
                    </label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 outline-none' placeholder = "language of the book" name="language" required value={data.language} onChange={change} />
                </div>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-zinc-400'>
                        Price
                    </label>
                    <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 outline-none' placeholder = "price of the book" name="price" required value={data.price} onChange={change} />
                </div>
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Description of the book
                </label>
                <textarea rows="5" className='w-full mt-2 bg-zinc-900 text-zinc-100 outline-none' placeholder = "description of the book" name="description" required value={data.description} onChange={change} />
            </div>
            <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-200' onClick={submit}>
                Update Book
            </button>
        </div>
    </div>
  );
};

export default UpdateBook
