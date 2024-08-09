import React from 'react';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
// import logo from "../../assets/logo.png";

function Navbar() {

    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "About Us",
            link: "/about-us",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    // console.log(isLoggedIn);

    if(isLoggedIn === false)
    {
        links.splice(3,3);
    }

    if(isLoggedIn === true && role === "user")
    {
        links.splice(5, 1);
    }

    if(isLoggedIn === true && role === "admin")
    {
        links.splice(4, 1);
    }

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

    const [burger, setBurger] = useState(false);


  return (
    <>
        <nav className = {`z-50 relative flex bg-blue-50 text-black px-8 py-4 items-center justify-between ${sticky?"sticky top-0 shadow-md duration-300 transition-all ease-in-out":""}`}>
            
            <Link to = "/" className='flex items-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" className='h-10 me-4' />
                <h1 className='text-2xl font-semibold'>BookBug</h1>
            </Link>

            <div className='nav-links-bookbug block md:flex items-center gap-4'>
                <div className='hidden md:flex gap-4'>
                    {links.map((items, i) => (
                        <Link to = {items.link}className='hover:bg-blue-200 hover:cursor-pointer px-3 py-2 text-lg rounded-md transition-all duration-300' key={i}>
                            {items.title}{" "}
                        </Link>
                    ))}
                </div>

                {
                    isLoggedIn === false && 
                    <div className='hidden md:flex gap-4'>
                        <Link to = "/LogIn" className='px-2 py-1 border border-zinc-400 rounded-md font-medium hover:scale-95 hover:bg-blue-300 hover:border-black transition-all duration-200 '>LogIn</Link>
                        <Link to = "/SignUp" className='px-2 py-1 bg-blue-300 rounded-md text-black font-semibold hover:scale-95 hover:bg-slate-800 hover:text-white border border-black transition-all duration-200'>SignUp</Link>
                    </div>
                }

                <button className='md:hidden text-black text-2xl px-3 py-2 hover:bg-blue-300 rounded-md hover:scale-110 transition-all duration-200' onClick={() => burger? setBurger(false) : setBurger(true)}>
                    <div className={`${burger?"hidden":"block"}`}><FaGripLines /></div>
                    <div className={`${burger?"block hover:rotate-90 transition-all duration-200":"hidden"}`}><RxCross2 /></div>
                </button>
            </div>
        </nav>

        <div className= {`${burger?"block":"hidden"} bg-slate-50 h-screen py-20 text-lg pl-2 absolute top-0 right-0 w-80 z-40 flex flex-col items-start justify-start text-black`}>
            {links.map((items, i) => (
                <Link to = {items.link}className=' hover:bg-blue-300 w-[312px] hover:text-black hover:cursor-pointer px-2 py-1 rounded-md transition-all duration-300' key={i} onClick={() => burger? setBurger(false) : setBurger(true)}>
                    {items.title}{" "}
                </Link>
            ))}   

            {
                isLoggedIn === false && 
                <>
                    <Link to = "/LogIn" className='w-[312px] px-2 py-1 hover:bg-slate-300 rounded-md transition-all duration-300' onClick={() => burger? setBurger(false) : setBurger(true)}>LogIn</Link>

                    <Link to = "/SignUp" className='w-[312px] px-2 py-1 hover:bg-slate-300 rounded-md transition-all duration-300' onClick={() => burger? setBurger(false) : setBurger(true)}>SignUp</Link>
                </>
            }
        </div>
    </>
  )
}

export default Navbar
