import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookCard({item, favourite}) {

    // console.log(item);
    
    const {author, description, language, price, title, url} = item;
    
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: item._id,
    };

    const handleRemoveBook = async () => {
      const response = await axios.put("https://bookbug-sid-backend.onrender.com/api/v1/remove-book-from-favourite", {}, { headers });

      alert(response.data.message);
    };

    return (
      <div>
        <Link to = {`/view-book-details/${item._id}`}>
            <div className=' mx-2 p-4 rounded bg-blue-100 flex flex-col hover:scale-105 transition-all duration-300'>
              <div className='bg-blue-200 flex rounded items-center justify-center'>
                <img src={url} alt="book_image" className='h-[25vh]' />
              </div>
              <h2 className='mt-4 text-xl font-semibold'>
              {title}</h2>
              <p className='mt-2 font-semibold'>by {author}</p>
              <p className='mt-2 font-semibold text-xl'>₹ {price}</p>
            </div>
        </Link>
        {favourite && (
          <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-600 mt-4 hover:scale-105 transition-all duration-200 hover:bg-yellow-100 font-semibold hover:text-yellow-700' onClick={handleRemoveBook}>
            Remove from favourite
          </button>
        )}
      </div>
    )
}

export default BookCard
